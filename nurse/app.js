(function(){
"use strict";
var ALL=(window.CASES||[]).slice(), CI=window.CHECKITEMS||{};
var PAGE=40;
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var STL={positive:"該当",negative:"非該当",unclear:"あいまい",not_asked:"聞き忘れ",observed:"観察",na:"対象外"};
var MODEL={talk:"聞き取り",obs:"観察",both:"両方"};
var RISK={high:"高",moderate:"中",low:"低"};
var RCL={high:"hi",moderate:"mo",low:"lo"};
var TYPEL={soap:"SOAP",assess:"情報収集"};

function roleOf(c,id){var s=(c.speakers||[]).filter(function(x){return x.id===id})[0];return s?s.role:""}
function roleCls(r){return r==="看護師"?"nurse":r==="患者"?"patient":r==="家族"?"family":"other"}
function spLabel(c,id){var s=(c.speakers||[]).filter(function(x){return x.id===id})[0];return s?(s.label||s.role||id):id}
function checkName(pid,id){var o=CI[pid];if(!o)return "";var r=o.items.filter(function(x){return x.id===id})[0];return r?r.name:""}
function checkMode(pid,id){var o=CI[pid];if(!o)return "";var r=o.items.filter(function(x){return x.id===id})[0];return r?r.mode:""}
function missCount(c){return (c.checklist||[]).filter(function(x){return x.status==="not_asked"}).length}
function riskOf(c){return c.judgement&&c.judgement.risk_level||""}

// ===== 絞り込みと一覧 =====
var st={type:"",problem:"",scene:"",risk:"",miss:"",rev:"",q:"",shown:PAGE};
var GROUPS=[
  ["type","種別",function(c){return c.type},function(v){return TYPEL[v]||v}],
  ["problem","看護問題",function(c){return c.problem||c.problem_id||""},null],
  ["scene","場面",function(c){return c.scene||""},null],
  ["risk","リスク度",function(c){return riskOf(c)},function(v){return RISK[v]||v}],
  ["miss","聞き忘れ",function(c){return c.type==="assess"?(missCount(c)?"あり":"なし"):""},null],
  ["rev","査読",function(c){return c.review?"査読済み":"未査読"},null]
];
function hay(c){
  if(c._hay)return c._hay;
  var p=[c.title,c.problem,c.scene,c.setting,(c.tags||[]).join(" "),JSON.stringify(c.patient||{})];
  (c.dialogue||[]).forEach(function(d){p.push(d.text)});
  ((c.soap||{}).items||[]).forEach(function(i){p.push(i.text)});
  (c.checklist||[]).forEach(function(i){p.push(i.value)});
  return c._hay=p.join("\n").toLowerCase();
}
function match(c,skip){
  for(var i=0;i<GROUPS.length;i++){var g=GROUPS[i];if(g[0]===skip)continue;if(st[g[0]]&&g[2](c)!==st[g[0]])return false}
  if(st.q){var q=st.q.toLowerCase().split(/\s+/);for(var j=0;j<q.length;j++)if(q[j]&&hay(c).indexOf(q[j])<0)return false}
  return true;
}
function renderSide(){
  var h="";
  GROUPS.forEach(function(g){
    var cnt={},keys=[];
    ALL.forEach(function(c){if(!match(c,g[0]))return;var v=g[2](c);if(!v)return;if(!(v in cnt)){cnt[v]=0;keys.push(v)}cnt[v]++});
    if(st[g[0]]&&!(st[g[0]] in cnt)){cnt[st[g[0]]]=0;keys.push(st[g[0]])}
    if(!keys.length)return;
    h+='<h3>'+g[1]+'</h3>';
    keys.sort().forEach(function(k){h+='<button class="opt'+(st[g[0]]===k?" on":"")+'" data-g="'+g[0]+'" data-v="'+esc(k)+'"><span>'+esc(g[3]?g[3](k):k)+'</span><span class="n">'+cnt[k]+'</span></button>'});
  });
  $("filters").innerHTML=h;
}
function cardHtml(c){
  var b='<span class="b '+c.type+'">'+(TYPEL[c.type]||c.type)+'</span>';
  if(c.problem)b+='<span class="b">'+esc(c.problem)+'</span>';
  if(riskOf(c))b+='<span class="b '+RCL[riskOf(c)]+'">リスク'+RISK[riskOf(c)]+'</span>';
  if(c.type==="assess")b+=missCount(c)?'<span class="b miss">聞き忘れ '+missCount(c)+'</span>':'<span class="b nomiss">聞き忘れなし</span>';
  if(c.review)b+='<span class="b rv">査読済み</span>';
  if(c.audio)b+='<span class="b au">音声あり</span>';
  var p=c.patient||{};
  return '<div class="card" data-id="'+esc(c.id)+'"><h2>'+esc(c.title||c.id)+'</h2>'
    +'<div class="pt">'+esc([p.name&&p.name+"さん",p.age&&p.age+"歳",p.sex,p.disease].filter(Boolean).join("・"))+'</div>'
    +'<div class="sc1">'+esc([c.scene,c.setting].filter(Boolean).join(" ／ "))+'</div>'
    +'<div class="badges">'+b+'</div><div class="tags">'+(c.tags||[]).map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join("")+'</div></div>';
}
function renderList(){
  var L=ALL.filter(function(c){return match(c)});
  $("total").textContent=ALL.length+" 件";
  $("count").textContent=L.length+" 件を表示"+(L.length<ALL.length?"（全 "+ALL.length+" 件中）":"");
  $("list").innerHTML=L.length?L.slice(0,st.shown).map(cardHtml).join(""):'<div class="empty">'+(ALL.length?"条件に合う事例がありません．":"事例がまだありません．")+'</div>';
  $("more").hidden=L.length<=st.shown;
}
function refresh(){st.shown=PAGE;renderSide();renderList()}

// ===== 確認モード（localStorage 接頭辞 ndlg:）・自動送信 =====
var QP="ndlg:",judgeOn=false,curCase=null;
var SYN=window.SYNC||{url:"",key:""};
function now(){return new Date().toISOString()}
var qs={
  get:function(k){try{var v=localStorage.getItem(QP+k);return v?JSON.parse(v):null}catch(_){return null}},
  set:function(k,v){try{localStorage.setItem(QP+k,JSON.stringify(v))}catch(_){}},
  del:function(k){try{localStorage.removeItem(QP+k)}catch(_){}}
};
function qName(){return qs.get("_name")||""}
function askName(cb){
  if(qName()){cb();return}
  var o=document.createElement("div");o.className="nmodal";
  o.innerHTML='<div class="nbox"><p>確認者のお名前を入力してください（記入内容に添えて記録されます）．</p><input type="text" maxlength="40" placeholder="お名前"><div class="nbt"><button class="ok">保存して続ける</button><button class="ng">キャンセル</button></div></div>';
  document.body.appendChild(o);var inp=o.querySelector("input");inp.focus();
  function done(ok){var v=inp.value.trim();if(ok&&!v){inp.focus();return}document.body.removeChild(o);if(ok){qs.set("_name",v);showName();cb()}}
  o.querySelector(".ok").onclick=function(){done(true)};o.querySelector(".ng").onclick=function(){done(false)};
  inp.onkeydown=function(e){if(e.key==="Enter")done(true)};
}
function showName(){var b=$("nameBtn");if(!b)return;b.hidden=!judgeOn;b.textContent="お名前："+(qName()||"未入力")+"（変更）"}
var sync={
  timer:null,busy:false,err:false,
  on:function(){return /^https:/.test(SYN.url||"")&&!!SYN.key},
  device:function(){var d=qs.get("_device");if(!d){d=Math.random().toString(36).slice(2,10);qs.set("_device",d)}return d},
  queue:function(v){if(v===undefined)return qs.get("_queue")||[];qs.set("_queue",v)},
  push:function(ev){
    if(!this.on())return;
    var q=this.queue();q.push(ev);this.queue(q);this.show();this.later(1200);
  },
  later:function(ms){var t=this;clearTimeout(t.timer);t.timer=setTimeout(function(){t.flush()},ms)},
  flush:function(){
    var t=this;if(t.busy||!t.on())return;
    var q=t.queue();if(!q.length){t.show();return}
    t.busy=true;var batch=q.slice(0,200);
    fetch(SYN.url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({k:SYN.key,device:t.device(),events:batch})})
    .then(function(r){return r.json()}).then(function(j){
      if(!j.ok)throw new Error(j.error||"error");
      t.queue(t.queue().slice(batch.length));t.err=false;if(t.queue().length)t.later(300);
    }).catch(function(){t.err=true;t.later(30000)}).then(function(){t.busy=false;t.show()});
  },
  show:function(){
    var el=$("syncState");if(!el)return;
    if(!this.on()||!judgeOn&&!this.queue().length){el.hidden=true;return}
    var n=this.queue().length;el.hidden=false;
    el.className="sync "+(this.err?"err":n?"wait":"on");
    el.title="記入内容は西村研のスプレッドシートへ自動で送られます";
    el.lastChild.textContent=this.err?"未送信 "+n+" 件（再送します）":n?"送信中 "+n+" 件":"自動送信：済";
  }
};
window.addEventListener("online",function(){sync.flush()});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")sync.flush()});

// 項目の種類ごとのボタン定義  [キー，表示，status]
var KINDS={
  turn:{btns:[["ok","OK","ok"],["fix","修正案","fix"],["drop","不自然・削除","drop"]],prop:{fix:"text"}},
  soap:{btns:[["ok","適切","ok"],["field","欄が違う","欄が違う"],["noev","根拠なし","根拠なし"],["fix","修正案","fix"]],prop:{field:"field",fix:"text"}},
  check:{btns:[["ok","正しい","ok"],["wrong","ラベルが違う","ラベル違い"]],prop:{wrong:"status"}},
  judge:{btns:[["ok","同意","ok"],["ng","不同意","不同意"]],prop:{}}
};
function selOpts(kind){
  if(kind==="field")return ["S","O","A","P"].map(function(f){return [f,"→"+f]});
  return Object.keys(STL).map(function(k){return [k,"→"+STL[k]]});
}
function rvHtml(c,kind,path,label,text,ph){
  var r=qs.get(path)||{},K=KINDS[kind],pk=K.prop[r.s]||"";
  var h='<div class="jd" data-kind="'+kind+'" data-path="'+esc(path)+'" data-label="'+esc(label)+'" data-text="'+esc(text||"")+'">';
  K.btns.forEach(function(b){h+='<button type="button" class="jb'+(r.s===b[0]?" on":"")+'" data-k="'+b[0]+'">'+b[1]+'</button>'});
  ["field","status"].forEach(function(sk){
    h+='<select class="js" data-sk="'+sk+'"'+(pk===sk?"":" hidden")+'><option value="">選択</option>'+selOpts(sk).map(function(o){return '<option value="'+o[0]+'"'+(pk===sk&&r.p===o[0]?" selected":"")+'>'+o[1]+'</option>'}).join("")+'</select>';
  });
  h+='<textarea class="jp" rows="2" placeholder="'+esc(ph||"直した文を書いてください")+'"'+(pk==="text"?"":" hidden")+'>'+(pk==="text"?esc(r.p||""):"")+'</textarea>';
  h+='<textarea class="jc" rows="1" placeholder="コメント（任意）">'+esc(r.c||"")+'</textarea></div>';
  return h;
}
function entityOf(c){return c.id+" "+(c.title||"")}
function emit(c,box){
  var path=box.dataset.path,kind=box.dataset.kind,K=KINDS[kind];
  var r=qs.get(path)||{};
  var comment=box.querySelector(".jc").value.trim();
  var pk=K.prop[r.s]||"",p="";
  if(pk==="text")p=box.querySelector(".jp").value.trim();
  else if(pk)p=box.querySelector('.js[data-sk="'+pk+'"]').value;
  r.p=p;r.c=comment;
  var bt=r.s&&K.btns.filter(function(b){return b[0]===r.s})[0];
  var status=bt?bt[2]:(comment?"意見":"clear");
  if(status==="clear")qs.del(path);else qs.set(path,r);
  sync.push({path:"ndlg/"+path,entity:entityOf(c),label:box.dataset.label,text:box.dataset.text,status:status,proposal:p,comment:comment,reviewer:qName(),ts:now()});
}
function onJudgeClick(e){
  var c=curCase,b=e.target.closest(".jb");if(!b||!c)return;
  var box=b.closest(".jd"),path=box.dataset.path,K=KINDS[box.dataset.kind];
  askName(function(){
    var r=qs.get(path)||{},k=b.dataset.k;
    r.s=r.s===k?"":k;qs.set(path,r);
    [].forEach.call(box.querySelectorAll(".jb"),function(x){x.classList.toggle("on",x.dataset.k===r.s)});
    var pk=K.prop[r.s]||"";
    box.querySelector(".jp").hidden=pk!=="text";
    [].forEach.call(box.querySelectorAll(".js"),function(s){s.hidden=s.dataset.sk!==pk;if(s.hidden)s.value=""});
    if(pk==="text"){var ta=box.querySelector(".jp");if(!ta.value&&box.dataset.kind==="turn")ta.value=box.dataset.text;ta.focus()}
    emit(c,box);
  });
}
function onJudgeChange(e){
  var t=e.target;if(!(t.matches(".jp,.jc,.js"))||!curCase)return;
  var box=t.closest(".jd"),c=curCase;
  askName(function(){
    var r=qs.get(box.dataset.path)||{};
    if(!r.s&&t.matches(".jp,.js"))return;
    emit(c,box);
  });
}
function caseBoxHtml(c){
  var r=qs.get(c.id+"/case")||{};
  return '<div class="jcase"><h3>この事例へのご意見（自由記述）</h3><textarea class="jcc" rows="3" maxlength="1000" placeholder="気づいたこと，ご意見など">'+esc(r.c||"")+'</textarea><div class="jcb"><button class="jsend">送信</button><span class="jmsg"></span></div></div>';
}
function onCaseSend(e){
  if(!e.target.closest(".jsend")||!curCase)return;
  var c=curCase,box=e.target.closest(".jcase"),txt=box.querySelector(".jcc").value.trim(),path=c.id+"/case";
  askName(function(){
    if(txt)qs.set(path,{c:txt});else qs.del(path);
    sync.push({path:"ndlg/"+path,entity:entityOf(c),label:"事例全体のご意見",text:"",status:txt?"意見":"clear",proposal:"",comment:txt,reviewer:qName(),ts:now()});
    box.querySelector(".jmsg").textContent=txt?"送信しました":"取り消しました";
  });
}

// ===== 詳細 =====
function personsHtml(c){
  var p=c.patient||{},h="";
  h+='<div><b>患者</b> '+esc([p.name&&p.name+"さん",p.age&&p.age+"歳",p.sex,p.disease].filter(Boolean).join("・"))+(p.persona?'<br>'+esc(p.persona):'')+'</div>';
  (c.others||[]).forEach(function(o){h+='<div><b>'+esc(o.role||"その他")+'</b> '+esc([o.relation,o.age&&o.age+"歳",o.sex].filter(Boolean).join("・"))+(o.persona?'<br>'+esc(o.persona):'')+'</div>'});
  var n=c.nurse||{};
  h+='<div><b>看護師</b> '+esc([n.sex,n.years&&n.years+"年目"].filter(Boolean).join("・"))+'</div>';
  return '<div class="people">'+h+'</div>';
}
function dialogueHtml(c){
  var obs={};(c.observations||[]).forEach(function(o){(obs[o.at_turn]=obs[o.at_turn]||[]).push(o)});
  var turns=(c.audio||{}).turns||[],h='<div class="dlg">';
  function obsHtml(list){return (list||[]).map(function(o){return '<div class="obs" data-obs="'+esc(o.id)+'"><b>観察</b>'+esc(o.text)+'</div>'+(judgeOn?rvHtml(c,"turn",c.id+"/obs/"+o.id,"観察 "+o.id,o.text,"直した観察を書いてください"):'')}).join("")}
  h+=obsHtml(obs[-1]);
  (c.dialogue||[]).forEach(function(d,i){
    var role=roleOf(c,d.speaker),cl=roleCls(role),jd=judgeOn?rvHtml(c,"turn",c.id+"/turn/"+i,"発話"+i+"（"+(role||d.speaker)+"）",d.text):"";
    h+='<div class="msg '+cl+'" data-turn="'+i+'"><div class="who">'+esc(spLabel(c,d.speaker))+'</div><div class="row"><span class="no">'+i+'</span>'
      +'<div class="t">'+esc(d.text)+'</div>'+(turns[i]?'<button class="pl" data-i="'+i+'" title="この発話だけ再生">▶</button>':'')+'</div>'+jd+'</div>';
    h+=obsHtml(obs[i]);
  });
  return h+'</div>';
}
function evBadges(ev){
  return (ev||[]).map(function(x){return '<span class="ib ev">'+(typeof x==="number"?"発話"+x:"観察 "+esc(x))+'</span>'}).join("");
}
function soapHtml(c){
  var items=(c.soap||{}).items||[],h='<h3>看護記録（SOAP）'+(c.soap&&c.soap.problem_label?'：'+esc(c.soap.problem_label):'')+'</h3><div class="soap">';
  ["S","O","A","P"].forEach(function(f){
    var L=items.filter(function(x){return x.field===f});
    h+='<div class="sc '+f+'"><h4>'+f+'</h4>';
    if(!L.length)h+='<div class="nil">（なし）</div>';
    else h+='<ul class="its">'+L.map(function(it){
      var b=evBadges(it.evidence)+(it.source?'<span class="ib">'+esc(it.source)+'</span>':'');
      return '<li class="it" data-ev="'+esc(JSON.stringify(it.evidence||[]))+'"><span class="itn">'+it.no+'</span><span class="itt">'+esc(it.text)+'</span>'+(b?'<div class="ibs">'+b+'</div>':'')
        +(judgeOn?rvHtml(c,"soap",c.id+"/soap/"+it.no,f+" 項目"+it.no,it.text,"直した記録文を書いてください"):'')+'</li>';
    }).join("")+'</ul>';
    h+='</div>';
  });
  return h+'</div>';
}
function assessHtml(c){
  var h='<h3>チェック項目（'+esc((CI[c.problem_id]||{}).name||c.problem||"")+'）</h3><div class="tblw"><table class="chk"><tr><th>ID</th><th>項目名</th><th>mode</th><th>status</th><th>value</th><th>根拠</th></tr>';
  (c.checklist||[]).forEach(function(x){
    var nm=checkName(c.problem_id,x.item)||"",md=checkMode(c.problem_id,x.item);
    h+='<tr class="cr" data-ev="'+esc(JSON.stringify(x.evidence||[]))+'"><td class="id">'+esc(x.item)+'</td><td>'+esc(nm)+'</td><td>'+esc(MODEL[md]||md||"")+'</td><td><span class="st '+esc(x.status)+'">'+esc(STL[x.status]||x.status)+'</span></td><td>'+esc(x.value||"")+'</td><td>'+evBadges(x.evidence)+'</td></tr>';
    if(judgeOn)h+='<tr class="rvrow"><td colspan="6">'+rvHtml(c,"check",c.id+"/check/"+x.item,"チェック "+x.item,(nm?nm+"："+(STL[x.status]||x.status):x.status))+'</td></tr>';
  });
  h+='</table></div>';
  var j=c.judgement;
  if(j){
    h+='<h3>立案判断</h3><div class="jdg"><p><b>'+esc(j.plan||"")+'</b>'+(j.risk_level?' <span class="b '+RCL[j.risk_level]+'">リスク'+(RISK[j.risk_level]||j.risk_level)+'</span>':'')+'</p><p>'+esc(j.reason||"")+'</p>'
      +((j.suggest_next||[]).length?'<p><b>次に聞くとよい質問</b></p><ul>'+j.suggest_next.map(function(s){return '<li>'+esc(s)+'</li>'}).join("")+'</ul>':'')+'</div>';
    if(judgeOn)h+=rvHtml(c,"judge",c.id+"/judgement","立案判断",(j.plan||"")+"："+(j.reason||""));
  }
  return h;
}
function reviewHtml(c){
  var r=c.review;if(!r)return "";
  var sc=r.astra_scores||{};
  var h='<details class="rvw"><summary>GPT-6-Astra 査読</summary><div class="rv"><p>'+esc(r.astra_overall||"")+'</p>';
  var sk=Object.keys(sc);if(sk.length)h+='<p>スコア：'+sk.map(function(k){return esc(k)+" "+esc(sc[k])}).join("　")+'</p>';
  h+='<h5>採用した指摘</h5>'+((r.accepted||[]).length?'<ul>'+r.accepted.map(function(a){return '<li>['+esc(a.where)+'] '+esc(a.detail)+(a.fix?'<br>→ '+esc(a.fix):'')+'</li>'}).join("")+'</ul>':'<p>なし</p>');
  h+='<h5>不採用の指摘</h5>'+((r.rejected||[]).length?'<ul>'+r.rejected.map(function(a){return '<li>['+esc(a.where)+'] '+esc(a.detail)+(a.why?'<br>理由：'+esc(a.why):'')+'</li>'}).join("")+'</ul>':'<p>なし</p>');
  return h+'</div></details>';
}
function openCase(c){
  curCase=c;
  var d=$("detail"),b=(c.type==="soap"?soapHtml(c):assessHtml(c));
  var badges='<span class="b '+c.type+'">'+(TYPEL[c.type]||c.type)+'</span> '+(c.problem?'<span class="b">'+esc(c.problem)+'</span>':'');
  var h='<div class="panel"><div class="ph"><div><h2>'+esc(c.title||c.id)+'</h2><div class="meta">'+badges+' '+esc(c.id)+'</div></div><button class="close" aria-label="閉じる">×</button></div><div class="pb">';
  h+=personsHtml(c)+'<div class="meta">場面：'+esc([c.scene,c.setting].filter(Boolean).join(" ／ "))+(c.variation?'<br>variation：'+esc(c.variation):'')+'</div>';
  if(judgeOn)h+='<div class="jnote" style="margin-top:10px">確認モード：各発話・項目の下のボタンで OK／修正案などを選べます．選ぶと自動で送信されます（もう一度押すと取り消し）．</div>';
  h+='<h3>音声</h3>'+(c.audio?'<div class="player"><audio id="au" controls preload="none" src="'+esc(c.audio.src)+'"></audio></div>':'<div class="nopl">音声は準備中</div>');
  h+='<h3>対話</h3>'+dialogueHtml(c)+b+reviewHtml(c);
  if(judgeOn)h+=caseBoxHtml(c);
  h+='</div></div>';
  d.innerHTML=h;d.hidden=false;document.body.style.overflow="hidden";
  setupAudio(c);
}
function closeCase(){var a=$("au");if(a)a.pause();$("detail").hidden=true;$("detail").innerHTML="";document.body.style.overflow="";curCase=null}

// 根拠ハイライト
function clearHl(){[].forEach.call($("detail").querySelectorAll(".hl,.sel"),function(x){x.classList.remove("hl","sel")})}
function hlEvidence(el){
  clearHl();el.classList.add("sel");
  var ev=[];try{ev=JSON.parse(el.dataset.ev)}catch(_){}
  var first=null;
  ev.forEach(function(x){
    var t=typeof x==="number"?$("detail").querySelector('.msg[data-turn="'+x+'"]'):$("detail").querySelector('.obs[data-obs="'+x+'"]');
    if(t){t.classList.add("hl");if(!first)first=t}
  });
  if(first)first.scrollIntoView({block:"center",behavior:"smooth"});
}

// 音声
var segEnd=null,curTurn=-1;
function setupAudio(c){
  var a=$("au");segEnd=null;curTurn=-1;if(!a||!c.audio)return;
  var T=c.audio.turns;
  a.addEventListener("timeupdate",function(){
    var t=a.currentTime;
    if(segEnd!==null&&t>=segEnd){a.pause();segEnd=null}
    var idx=-1;for(var i=0;i<T.length;i++)if(T[i]&&t>=T[i][0]&&t<T[i][1]){idx=i;break}
    if(idx!==curTurn){
      var o=$("detail").querySelector(".msg.playing");if(o)o.classList.remove("playing");
      curTurn=idx;
      if(idx>=0&&!a.paused){var m=$("detail").querySelector('.msg[data-turn="'+idx+'"]');if(m){m.classList.add("playing");m.scrollIntoView({block:"center",behavior:"smooth"})}}
    }
  });
  a.addEventListener("pause",function(){var o=$("detail").querySelector(".msg.playing");if(o)o.classList.remove("playing");curTurn=-1});
}
function playSeg(i){
  var a=$("au");if(!a||!curCase)return;var t=curCase.audio.turns[i];if(!t)return;
  segEnd=t[1];a.currentTime=t[0];var p=a.play();if(p&&p.catch)p.catch(function(){});
}

// ===== イベント =====
$("filters").addEventListener("click",function(e){
  var o=e.target.closest(".opt");if(!o)return;
  var g=o.dataset.g,v=o.dataset.v;st[g]=st[g]===v?"":v;refresh();
});
$("reset").onclick=function(){GROUPS.forEach(function(g){st[g[0]]=""});st.q="";$("q").value="";refresh()};
$("q").addEventListener("input",function(){st.q=this.value.trim();refresh()});
$("menuBtn").onclick=function(){$("side").classList.toggle("open")};
$("side").addEventListener("click",function(e){if(e.target.closest(".opt,#reset")&&window.innerWidth<=760)setTimeout(function(){},0)});
$("more").onclick=function(){st.shown+=PAGE;renderList()};
$("list").addEventListener("click",function(e){
  var cd=e.target.closest(".card");if(!cd)return;
  var c=ALL.filter(function(x){return x.id===cd.dataset.id})[0];if(c)openCase(c);
});
$("detail").addEventListener("click",function(e){
  if(e.target===this||e.target.closest(".close")){closeCase();return}
  var pl=e.target.closest(".pl");if(pl){playSeg(+pl.dataset.i);return}
  if(e.target.closest(".jd")){onJudgeClick(e);return}
  if(e.target.closest(".jcase")){onCaseSend(e);return}
  var el=e.target.closest(".it,.cr");if(el)hlEvidence(el);
});
$("detail").addEventListener("change",onJudgeChange);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("detail").hidden&&!document.querySelector(".nmodal"))closeCase()});
$("judgeBtn").onclick=function(){
  judgeOn=!judgeOn;this.classList.toggle("on",judgeOn);this.textContent="確認モード："+(judgeOn?"ON":"OFF");
  showName();sync.show();
  if(judgeOn&&!qName())askName(function(){});
  if(curCase&&!$("detail").hidden){var c=curCase,a=$("au"),pos=a?a.currentTime:0,top=$("detail").querySelector(".pb").scrollTop;openCase(c);var a2=$("au");if(a2&&pos)a2.currentTime=pos;$("detail").querySelector(".pb").scrollTop=top}
};
$("nameBtn").onclick=function(){qs.del("_name");askName(function(){})};
showName();sync.show();sync.flush();refresh();
})();
