(function(){
"use strict";
var ALL=(window.CASES||[]).slice();
(function(){function rk(c){var hasS=c.soap&&Object.keys(c.soap).some(function(k){return c.soap[k]}),hasD=c.dialogue&&c.dialogue.length;var r=c.translated?0:(c.lang_original==="ja"&&hasS?1:(c.lang_original==="ja"?2:3));return (c.refined?0:10)+r*2+(c.category==="循環器"?0:1)}
ALL.forEach(function(c,i){c._o=i});ALL.sort(function(a,b){return rk(a)-rk(b)||a._o-b._o})})();
var CATS=["循環器","呼吸器","消化器","内分泌・代謝","神経","筋骨格・整形","腎・泌尿器","感染症","精神・心理","皮膚","小児","産婦人科","看護ケア","救急・外傷","その他"];
var COL={"循環器":"#d64550","呼吸器":"#2a9fc9","消化器":"#b8860b","内分泌・代謝":"#d9822b","神経":"#7a55c0","筋骨格・整形":"#7d8b3a","腎・泌尿器":"#2f8f83","感染症":"#c4478a","精神・心理":"#5c6bc0","皮膚":"#c97b63","小児":"#e0a100","産婦人科":"#d4568f","看護ケア":"#2e9b5b","救急・外傷":"#c0392b","その他":"#78909c"};
var PAGE=60;
var st={cat:"",lang:"",rec:"",set:"",src:"",body:"",ref:"",q:"",shown:PAGE};
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function langOf(c){return c.lang_original==="ja"?"ja":(c.translated?"tr":"en")}
function isLink(c){return c.reproduction==="link_only"}
// 検索用テキスト
ALL.forEach(function(c){
  var p=[c.title,(c.tags||[]).join(" "),c.summary,c.notes,(c.source||{}).name];
  (c.dialogue||[]).forEach(function(d){p.push(d.text)});
  (c.dialogue_original||[]).forEach(function(d){p.push(d.text)});
  ["soap","soap_original"].forEach(function(k){var o=c[k]||{};["S","O","A","P"].forEach(function(x){p.push(o[x])})});
  c._s=p.join("\n").toLowerCase();
});
function count(fn){var m={};ALL.forEach(function(c){var v=fn(c);if(v!=null&&v!=="")m[v]=(m[v]||0)+1});return m}
function filtered(skip){
  var q=st.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return ALL.filter(function(c){
    if(skip!=="cat"&&st.cat&&c.category!==st.cat)return false;
    if(st.lang&&langOf(c)!==st.lang)return false;
    if(st.rec&&c.record_type!==st.rec)return false;
    if(st.set&&c.setting!==st.set)return false;
    if(st.src&&(c.source||{}).name!==st.src)return false;
    if(st.ref&&!c.refined)return false;
    if(st.body){var l=isLink(c);if(st.body==="full"&&l)return false;if(st.body==="link"&&!l)return false}
    for(var i=0;i<q.length;i++)if(c._s.indexOf(q[i])<0)return false;
    return true;
  });
}
function optHtml(key,label,n,on,extra){return '<button class="opt'+(on?' on':'')+'" data-k="'+key+'" data-v="'+esc(label[0])+'"><span>'+esc(label[1])+'</span><span class="n">'+n+'</span></button>'}
function renderSide(){
  var cm=count.call(null,function(c){return c.category});
  var base=filtered("cat"),bm={};base.forEach(function(c){bm[c.category]=(bm[c.category]||0)+1});
  var h='<h3>カテゴリ</h3><button class="cat'+(st.cat?'':' on')+'" data-k="cat" data-v=""><span>すべて</span><span class="n">'+base.length+'</span></button>';
  var names=CATS.filter(function(c){return cm[c]});Object.keys(cm).forEach(function(c){if(names.indexOf(c)<0)names.push(c)});
  names.forEach(function(c){h+='<button class="cat'+(st.cat===c?' on':'')+'" data-k="cat" data-v="'+esc(c)+'"><span><i style="background:'+(COL[c]||COL["その他"])+'"></i>'+esc(c)+'</span><span class="n">'+(bm[c]||0)+'</span></button>'});
  $("cats").innerHTML=h;
  function grp(title,key,map,order){
    var keys=Object.keys(map);if(order)keys.sort(function(a,b){return order.indexOf(a)-order.indexOf(b)});
    var s='<h3>'+title+'</h3>';
    keys.forEach(function(k){var lab=order&&order.labels?order.labels[k]:k;s+='<button class="opt'+(st[key]===k?' on':'')+'" data-k="'+key+'" data-v="'+esc(k)+'"><span>'+esc(lab)+'</span><span class="n">'+map[k]+'</span></button>'});
    return s;
  }
  var lm=count(langOf),L=["ja","tr","en"];L.labels={ja:"日本語原文",tr:"日本語訳あり",en:"英語のみ"};
  var bd=count(function(c){return isLink(c)?"link":"full"}),B=["full","link"];B.labels={full:"本文あり",link:"リンクのみ"};
  var f=grp("言語","lang",lm,L)+grp("記録種別","rec",count(function(c){return c.record_type}))+grp("場面","set",count(function(c){return c.setting}))+grp("出典","src",count(function(c){return(c.source||{}).name}))+grp("本文","body",bd,B);
  var rn=ALL.filter(function(c){return c.refined}).length;
  if(rn)f=grp("整理","ref",{"1":rn},Object.assign(["1"],{labels:{"1":"整理済み"}}))+f;
  $("filters").innerHTML=f;
}
function card(c,i){
  var l=langOf(c),b=(c.refined?'<span class="b rf">整理済み</span>':'')+'<span class="b cat" style="background:'+(COL[c.category]||COL["その他"])+'">'+esc(c.category||"その他")+'</span>';
  if(l==="tr")b+='<span class="b tr">日本語訳</span>';
  if(l==="en")b+='<span class="b en">英語</span>';
  if(isLink(c))b+='<span class="b lk">リンクのみ</span>';
  if(c.setting)b+='<span class="b">'+esc(c.setting)+'</span>';
  if(c.record_type)b+='<span class="b">'+esc(c.record_type)+'</span>';
  var n=(c.dialogue||[]).length;
  if(c.refined){var jc=judgedCount(c);if(jc)b+='<span class="b jdn">判定済み '+jc+'/'+c.soap_items.length+'</span>'}
  return '<div class="card" data-i="'+i+'" data-id="'+esc(c.id)+'"><div class="badges">'+b+'</div><h2>'+esc(c.title)+'</h2><div class="tags">'+(c.tags||[]).map(function(t){return'<span>'+esc(t)+'</span>'}).join("")+'</div><div class="meta">'+esc((c.source||{}).name||"")+(n?' ・ 発話 '+n:'')+'</div></div>';
}
var cur=[];
function renderList(){
  cur=filtered();
  $("count").textContent=cur.length+" 件を表示中（全 "+ALL.length+" 件）";
  var part=cur.slice(0,st.shown);
  $("list").innerHTML=part.length?part.map(function(c,i){return card(c,i)}).join(""):'<div class="empty">条件に合う事例がありません</div>';
  $("more").hidden=cur.length<=st.shown;
  $("more").textContent="さらに表示（残り "+(cur.length-st.shown)+" 件）";
}
function refresh(){st.shown=PAGE;renderSide();renderList()}

// ===== 判定アンケート（localStorage 接頭辞 soapq:）・自動送信 =====
var QP="soapq:",judgeOn=false,curCase=null;
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
  o.innerHTML='<div class="nbox"><p>回答者のお名前を入力してください（回答に添えて記録されます）．</p><input type="text" maxlength="40" placeholder="お名前"><div class="nbt"><button class="ok">保存して続ける</button><button class="ng">キャンセル</button></div></div>';
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
    el.title="回答は西村研のスプレッドシートへ自動で送られます";
    el.lastChild.textContent=this.err?"未送信 "+n+" 件（再送します）":n?"送信中 "+n+" 件":"自動送信：済";
  }
};
window.addEventListener("online",function(){sync.flush()});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")sync.flush()});
function itemOf(c,no){return c.soap_items.filter(function(x){return x.no===no})[0]}
function jStat(r){return r.status==="欄が違う"?(r.proposal?"欄が違う→"+r.proposal:""):(r.status||"")}
function judgedCount(c){var n=0;(c.soap_items||[]).forEach(function(it){var r=qs.get(c.id+"/"+it.no);if(r&&jStat(r))n++});return n}
function sendItem(c,it,r){
  var s=jStat(r);if(!s)return;
  sync.push({path:"soap/"+c.id+"/"+it.no,entity:c.id+" "+c.title,label:it.field+" 項目"+it.no,text:it.text,status:s,proposal:r.proposal||"",comment:r.comment||"",reviewer:qName(),ts:now()});
}
function jSave(c,no,patch){
  var it=itemOf(c,no),k=c.id+"/"+no,r=qs.get(k)||{};
  if(patch==="clear"){qs.del(k);sync.push({path:"soap/"+c.id+"/"+no,entity:c.id+" "+c.title,label:it.field+" 項目"+no,text:it.text,status:"clear",proposal:"",comment:"",reviewer:qName(),ts:now()});return}
  for(var x in patch)r[x]=patch[x];r.ts=now();qs.set(k,r);sendItem(c,it,r);
}
function judgeHtml(c,it){
  var r=qs.get(c.id+"/"+it.no)||{};
  var h='<div class="jd" data-no="'+it.no+'">'+["適切","欄が違う","対話に根拠なし","不要"].map(function(b){return '<button class="jb'+(r.status===b?' on':'')+'" data-j="'+b+'">'+b+'</button>'}).join("");
  if(r.status==="欄が違う")h+='<span class="jf">正しい欄：'+["S","O","A","P"].filter(function(x){return x!==it.field}).map(function(x){return '<button class="jb jp'+(r.proposal===x?' on':'')+'" data-p="'+x+'">'+x+'</button>'}).join("")+'</span>';
  return h+'<input class="jc" type="text" maxlength="300" placeholder="コメント（任意）" value="'+esc(r.comment||"")+'"></div>';
}
function caseBoxHtml(c){
  var r=qs.get(c.id+"/case")||{};
  return '<div class="jcase"><h3>この事例へのご意見（自由記述）</h3><textarea class="jcc" rows="3" maxlength="1000" placeholder="気づいたこと，ご意見など">'+esc(r.comment||"")+'</textarea><div class="jcb"><button class="jsend">送信</button><span class="jmsg">'+(r.sent?'送信しました':'')+'</span>'+(judgeOn&&c.refined?'<button class="jdone'+(r.done?' on':'')+'">'+(r.done?'判定を完了済み（取り消す）':'この事例の判定を完了')+'</button>':'')+'</div></div>';
}
function caseSend(c,box,done){
  var ta=box.querySelector(".jcc"),k=c.id+"/case",r=qs.get(k)||{};
  var txt=ta.value.trim(),ev={path:"soap/"+c.id+"/case",entity:c.id+" "+c.title,label:"事例全体",text:"",proposal:"",comment:txt,reviewer:qName(),ts:now()};
  if(done==="done"){r.done=true;ev.status="完了"}
  else if(done==="undo"){r.done=false;ev.status="clear";ev.comment=""}
  else{if(txt===(r.comment||"")&&r.sent)return;if(!txt&&!r.comment)return;ev.status="意見";r.sent=true}
  r.comment=txt;r.ts=ev.ts;qs.set(k,r);sync.push(ev);
  var m=box.querySelector(".jmsg");
  if(done){box.outerHTML=caseBoxHtml(c)}else if(m)m.textContent="送信しました";
}
// 詳細
var detailMode="ja";
function soapHtml(o){
  o=o||{};var names={S:"S 主観的情報",O:"O 客観的情報",A:"A 評価",P:"P 計画"};
  return '<div class="soap">'+["S","O","A","P"].map(function(k){var v=o[k];return '<div class="sc '+k+'"><h4>'+names[k]+'</h4><div'+(v?'':' class="nil"')+'>'+(v?esc(v):'（記載なし）')+'</div></div>'}).join("")+'</div>';
}
var BADGE_F={S:"S",O:"O",A:"A",P:"P"};
function itemsHtml(c){
  var names={S:"S 主観的情報",O:"O 客観的情報",A:"A 評価",P:"P 計画"};
  return '<div class="soap">'+["S","O","A","P"].map(function(k){
    var its=c.soap_items.filter(function(x){return x.field===k});
    return '<div class="sc '+k+'"><h4>'+names[k]+'</h4>'+(its.length?'<ol class="its">'+its.map(function(it){
      var b='';
      if(it.support==="note_only")b+='<span class="ib no">対話に根拠なし</span>';else if(it.support==="partial")b+='<span class="ib pa">一部根拠</span>';
      if(it.change==="moved")b+='<span class="ib mv">'+esc((it.moved_from||"?")+"→"+it.field)+' に移動</span>';else if(it.change==="split")b+='<span class="ib sp">分割</span>';
      if(it.disputed)b+='<span class="ib dp">要確認</span>';
      return '<li class="it" data-no="'+it.no+'" data-ev="'+(it.evidence||[]).join(",")+'"><span class="itn">'+it.no+'</span><span class="itt">'+esc(it.text)+'</span>'+(b?'<span class="ibs">'+b+'</span>':'')+(judgeOn?judgeHtml(c,it):'')+'</li>';
    }).join("")+'</ol>':'<div class="nil">（該当項目なし）</div>')+'</div>';
  }).join("")+'</div>';
}
function reviewHtml(c){
  var r=c.review||{},h='';
  if(c.change_summary)h+='<p>'+esc(c.change_summary)+'</p>';
  function list(t,a,f){if(a&&a.length)h+='<h5>'+t+'</h5><ul>'+a.map(f).join("")+'</ul>'}
  if(Array.isArray(r.astra_issues))list("Astra の指摘（突き合わせ前）",r.astra_issues,function(x){return '<li>'+(x.item_no!=null?'項目'+x.item_no+'：':'')+esc((x.type||"")+" "+(x.detail||x.suggest||""))+'</li>'});
  else if(r.astra_issues!=null)h+='<p>Astra の指摘：'+esc(r.astra_issues)+' 件</p>';
  list("採用した指摘",r.accepted,function(x){return '<li>'+(x.item_no!=null?'項目'+x.item_no+'：':'')+esc(x.type+"　"+x.detail)+'</li>'});
  list("採用しなかった指摘",r.rejected,function(x){return '<li>'+(x.item_no!=null?'項目'+x.item_no+'：':'')+esc(x.type+"　"+x.detail)+(x.why?'（理由：'+esc(x.why)+'）':'')+'</li>'});
  list("対話にあるが SOAP に無い情報（記録のみ）",r.missing_info,function(x){return '<li>'+esc(x)+'</li>'});
  return '<details><summary>整理の記録</summary><div class="rv">'+(h||'<p>記録なし</p>')+'</div></details>';
}
function chatHtml(arr,sp,no){
  sp=sp||{};
  if(!arr||!arr.length)return '<div class="mt">（対話なし）</div>';
  return '<div class="chat">'+arr.map(function(d,i){var k=["doctor","patient","nurse","family","other"].indexOf(d.speaker)<0?"other":d.speaker;var nm=sp[d.speaker]||({doctor:"医師",patient:"患者",nurse:"看護師",family:"家族",other:"その他"})[k];return '<div class="msg '+k+'" data-n="'+i+'"><div class="who">'+(no?'<span class="dn">'+i+'</span>':'')+esc(nm)+'</div><div class="t">'+esc(d.text)+'</div></div>'}).join("")+'</div>';
}
function spOrig(c){return c.speakers_original||{doctor:"Doctor",patient:"Patient",nurse:"Nurse",family:"Family",other:"Other"}}
function openCase(c){
  curCase=c;var sel=null;
  var l=langOf(c),s=c.source||{};
  var h='<div class="panel"><div class="ph"><div><h2>'+esc(c.title)+'</h2><div class="badges"><span class="b cat" style="background:'+(COL[c.category]||COL["その他"])+'">'+esc(c.category||"その他")+'</span>'+(c.setting?'<span class="b">'+esc(c.setting)+'</span>':'')+(c.record_type?'<span class="b">'+esc(c.record_type)+'</span>':'')+(c.tags||[]).map(function(t){return'<span class="b">#'+esc(t)+'</span>'}).join("")+'</div></div><button class="x" id="closeD">閉じる</button></div><div class="pb">'+(c.refined&&judgeOn?'<div class="jnote">各項目が S/O/A/P のどれに当たるか，対話に根拠があるかを判定してください．<br>項目をタップすると根拠の発話が強調されます．<br>回答は西村研のスプレッドシートへ自動で送られます．</div>':'');
  if(isLink(c)){
    var u=s.item_url||s.url||"";
    h+='<div class="linkonly"><p>'+esc(c.summary||"")+'</p>'+(u?'<a href="'+esc(u)+'" target="_blank" rel="noopener">元のページを開く ↗</a>':'')+'</div><div class="mt">著作権の都合で本文は掲載せず，リンクのみ紹介しています．</div>';
  }else{
    var hasOrig=c.translated&&((c.dialogue_original||[]).length||Object.keys(c.soap_original||{}).length);
    if(hasOrig){h+='<div class="bar"><div class="seg" id="modeSeg"><button data-m="ja">日本語訳</button><button data-m="en">英語原文</button><button data-m="both">並べて表示</button></div><span class="mt">日本語訳は機械翻訳（Claude 訳）です．正確な内容は英語原文をご確認ください．</span></div>'}
    h+='<div class="tabs seg" id="tabSeg"><button data-t="d" class="on">対話</button><button data-t="s">SOAP</button></div><div id="body"></div>';
  }
  h+=caseBoxHtml(c);
  h+='<div class="foot"><div>出典：'+(s.url?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.name)+'</a>':esc(s.name||""))+(s.item_url&&!isLink(c)?' ・ <a href="'+esc(s.item_url)+'" target="_blank" rel="noopener">元データ</a>':'')+'</div><div>ライセンス：'+esc(s.license||"未記載")+'</div>'+(s.citation?'<div>引用：'+esc(s.citation)+'</div>':'')+(c.notes?'<div>備考：'+esc(c.notes)+'</div>':'')+(c.refined?reviewHtml(c):'')+(c.note_original_raw?'<details><summary>元のノート（原文のまま）</summary><pre>'+esc(c.note_original_raw)+'</pre></details>':'')+'</div></div></div>';
  var d=$("detail");d.innerHTML=h;d.hidden=false;document.body.style.overflow="hidden";
  $("closeD").onclick=function(){closeCase(true)};
  if(!isLink(c)){
    detailMode=l==="en"?"en":"ja";
    var seg=$("modeSeg");
    function draw(){
      var m=detailMode,bd=$("body");
      function col(title,dlg,soap,sp,cls){return '<div class="col '+cls+'" data-p="d"><h3>'+title+'・対話</h3>'+chatHtml(dlg,sp)+'</div><div class="col '+cls+'" data-p="s"><h3>'+title+'・SOAP</h3>'+soapHtml(soap)+'</div>'}
      var R=!!c.soap_items,ja=[c.dialogue,c.soap,c.speakers],en=[c.dialogue_original,c.soap_original,spOrig(c)];
      var inner;
      if(m==="both"&&hasOrig){
        inner='<div class="cols3"><div class="col"><h3>日本語訳 対話</h3>'+chatHtml(ja[0],ja[2],R)+'</div><div class="col"><h3>英語原文 対話</h3>'+chatHtml(en[0],en[2],R)+'</div><div class="col"><h3>日本語訳 SOAP</h3>'+(R?itemsHtml(c):soapHtml(ja[1]))+'</div><div class="col"><h3>英語原文 SOAP</h3>'+soapHtml(en[1])+'</div></div>';
        bd.innerHTML=inner;bd.className="both";
      }else{
        var x=(m==="en"&&hasOrig)?en:ja;
        bd.className="";
        bd.innerHTML='<div class="cols"><div class="col show" data-p="d"><h3>対話</h3>'+chatHtml(x[0],x[2],R)+'</div><div class="col" data-p="s"><h3>SOAP</h3>'+((R&&x===ja)?itemsHtml(c):soapHtml(x[1]))+'</div></div>';
        tab(window.__tab||"d");
      }
      if(seg)Array.prototype.forEach.call(seg.children,function(b){b.className=b.getAttribute("data-m")===m?"on":""});
      applySel();
    }
    function applySel(){
      Array.prototype.forEach.call(document.querySelectorAll("#body .msg.hl,#body .it.sel"),function(e){e.classList.remove("hl","sel")});
      if(sel==null)return;
      var li=document.querySelector('#body .it[data-no="'+sel+'"]');if(!li)return;li.classList.add("sel");
      var ev=(li.getAttribute("data-ev")||"").split(",").filter(Boolean);
      ev.forEach(function(n){Array.prototype.forEach.call(document.querySelectorAll('#body .msg[data-n="'+n+'"]'),function(e){e.classList.add("hl")})});
    }
    function selItem(no){
      sel=(sel===no)?null:no;applySel();
      if(sel==null)return;
      var li=document.querySelector('#body .it[data-no="'+sel+'"]'),ev=(li.getAttribute("data-ev")||"").split(",").filter(Boolean);
      if(!ev.length)return;
      if(window.innerWidth<=900&&detailMode!=="both")tab("d");
      var m=document.querySelector('#body .msg[data-n="'+ev[0]+'"]');
      if(m&&m.offsetParent)m.scrollIntoView({block:"center",behavior:"smooth"});
    }
    var bodyEl=$("body");
    bodyEl.onclick=function(e){
      var t=e.target,jb=t.closest(".jb");
      if(jb){
        var jd=jb.closest(".jd"),no=+jd.getAttribute("data-no"),r=qs.get(c.id+"/"+no)||{};
        askName(function(){
          if(jb.hasAttribute("data-p"))jSave(c,no,{status:"欄が違う",proposal:jb.getAttribute("data-p")});
          else{var v=jb.getAttribute("data-j");
            if(r.status===v)jSave(c,no,"clear");
            else if(v==="欄が違う"){var rr=qs.get(c.id+"/"+no)||{};rr.status=v;rr.proposal="";qs.set(c.id+"/"+no,rr)}
            else jSave(c,no,{status:v,proposal:""});}
          jd.outerHTML=judgeHtml(c,itemOf(c,no));
        });
        return;
      }
      if(t.closest(".jd"))return;
      var li=t.closest(".it");if(li)selItem(+li.getAttribute("data-no"));
    };
    bodyEl.addEventListener("change",function(e){
      var inp=e.target;if(!inp.classList.contains("jc"))return;
      var jd=inp.closest(".jd"),no=+jd.getAttribute("data-no"),v=inp.value.trim();
      askName(function(){
        var r=qs.get(c.id+"/"+no)||{};
        if(r.status&&jStat(r))jSave(c,no,{comment:v});else{r.comment=v;qs.set(c.id+"/"+no,r)}
      });
    });
    window.__tab="d";
    function tab(t){
      window.__tab=t;
      var ts=$("tabSeg");Array.prototype.forEach.call(ts.children,function(b){b.className=b.getAttribute("data-t")===t?"on":""});
      Array.prototype.forEach.call(document.querySelectorAll("#body .cols>.col"),function(e){e.className="col"+(e.getAttribute("data-p")===t?" show":"")});
    }
    // PC では常に両方表示（CSS で .col は mq 外では display:block/grid）
    $("tabSeg").onclick=function(e){var t=e.target.getAttribute("data-t");if(t)tab(t)};
    if(seg)seg.onclick=function(e){var m=e.target.getAttribute("data-m");if(m){detailMode=m;draw()}};
    draw();
  }
  var pb=d.querySelector(".pb");
  pb.addEventListener("click",function(e){
    var box=e.target.closest(".jcase");if(!box)return;
    if(e.target.classList.contains("jsend"))askName(function(){caseSend(c,box)});
    else if(e.target.classList.contains("jdone")){var r=qs.get(c.id+"/case")||{};askName(function(){caseSend(c,box,r.done?"undo":"done")})}
  });
  pb.addEventListener("focusout",function(e){
    var ta=e.target;
    if(!ta.classList||!ta.classList.contains("jcc"))return;
    if(e.relatedTarget&&e.relatedTarget.classList.contains("jsend"))return;
    if(ta.value.trim()!==((qs.get(c.id+"/case")||{}).comment||""))askName(function(){caseSend(c,ta.closest(".jcase"))});
  });
  d.scrollTop=0;
}
var opened=false;
function closeCase(push){
  var d=$("detail");d.hidden=true;d.innerHTML="";document.body.style.overflow="";curCase=null;renderList();
  if(push&&/^#c\//.test(location.hash)){history.back();return}
  opened=false;
}
function route(){
  var m=location.hash.match(/^#c\/(.+)$/);
  if(m){var id=decodeURIComponent(m[1]);var c=ALL.filter(function(x){return x.id===id})[0];if(c){openCase(c);opened=true;return}}
  if(!$("detail").hidden)closeCase(false);
}
// イベント
$("list").onclick=function(e){var el=e.target.closest(".card");if(!el)return;location.hash="c/"+encodeURIComponent(el.getAttribute("data-id"))};
$("more").onclick=function(){st.shown+=PAGE;renderList()};
function onFilter(e){var b=e.target.closest("button[data-k]");if(!b)return;var k=b.getAttribute("data-k"),v=b.getAttribute("data-v");st[k]=(k!=="cat"&&st[k]===v)?"":v;refresh();if(window.innerWidth<=900&&k==="cat")$("side").classList.remove("open")}
$("cats").onclick=onFilter;$("filters").onclick=onFilter;
$("reset").onclick=function(){st={cat:"",lang:"",rec:"",set:"",src:"",body:"",ref:"",q:"",shown:PAGE};$("q").value="";refresh()};
var tm;$("q").oninput=function(){clearTimeout(tm);tm=setTimeout(function(){st.q=$("q").value;refresh()},200)};
$("menuBtn").onclick=function(){$("side").classList.toggle("open")};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("detail").hidden)closeCase(true)});
$("detail").addEventListener("click",function(e){if(e.target===$("detail"))closeCase(true)});
window.addEventListener("hashchange",route);
$("judgeBtn").onclick=function(){
  judgeOn=!judgeOn;this.classList.toggle("on",judgeOn);this.textContent="判定モード："+(judgeOn?"ON":"OFF");
  showName();sync.show();if(curCase&&!$("detail").hidden){var c=curCase,top=$("detail").querySelector(".pb").scrollTop;openCase(c);$("detail").querySelector(".pb").scrollTop=top}
};
$("nameBtn").onclick=function(){var o=qName();qs.del("_name");askName(function(){});if(!qName()&&o)qs.set("_name",o);showName()};
showName();sync.show();sync.flush();
$("total").textContent="全 "+ALL.length+" 件";
refresh();route();
})();
