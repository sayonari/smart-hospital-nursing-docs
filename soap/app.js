(function(){
"use strict";
var ALL=(window.CASES||[]).slice();
(function(){function rk(c){var hasS=c.soap&&Object.keys(c.soap).some(function(k){return c.soap[k]}),hasD=c.dialogue&&c.dialogue.length;var r=c.translated?0:(c.lang_original==="ja"&&hasS?1:(c.lang_original==="ja"?2:3));return r*2+(c.category==="循環器"?0:1)}
ALL.forEach(function(c,i){c._o=i});ALL.sort(function(a,b){return rk(a)-rk(b)||a._o-b._o})})();
var CATS=["循環器","呼吸器","消化器","内分泌・代謝","神経","筋骨格・整形","腎・泌尿器","感染症","精神・心理","皮膚","小児","産婦人科","看護ケア","救急・外傷","その他"];
var COL={"循環器":"#d64550","呼吸器":"#2a9fc9","消化器":"#b8860b","内分泌・代謝":"#d9822b","神経":"#7a55c0","筋骨格・整形":"#7d8b3a","腎・泌尿器":"#2f8f83","感染症":"#c4478a","精神・心理":"#5c6bc0","皮膚":"#c97b63","小児":"#e0a100","産婦人科":"#d4568f","看護ケア":"#2e9b5b","救急・外傷":"#c0392b","その他":"#78909c"};
var PAGE=60;
var st={cat:"",lang:"",rec:"",set:"",src:"",body:"",q:"",shown:PAGE};
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
  $("filters").innerHTML=f;
}
function card(c,i){
  var l=langOf(c),b='<span class="b cat" style="background:'+(COL[c.category]||COL["その他"])+'">'+esc(c.category||"その他")+'</span>';
  if(l==="tr")b+='<span class="b tr">日本語訳</span>';
  if(l==="en")b+='<span class="b en">英語</span>';
  if(isLink(c))b+='<span class="b lk">リンクのみ</span>';
  if(c.setting)b+='<span class="b">'+esc(c.setting)+'</span>';
  if(c.record_type)b+='<span class="b">'+esc(c.record_type)+'</span>';
  var n=(c.dialogue||[]).length;
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
// 詳細
var detailMode="ja";
function soapHtml(o){
  o=o||{};var names={S:"S 主観的情報",O:"O 客観的情報",A:"A 評価",P:"P 計画"};
  return '<div class="soap">'+["S","O","A","P"].map(function(k){var v=o[k];return '<div class="sc '+k+'"><h4>'+names[k]+'</h4><div'+(v?'':' class="nil"')+'>'+(v?esc(v):'（記載なし）')+'</div></div>'}).join("")+'</div>';
}
function chatHtml(arr,sp){
  sp=sp||{};
  if(!arr||!arr.length)return '<div class="mt">（対話なし）</div>';
  return '<div class="chat">'+arr.map(function(d){var k=["doctor","patient","nurse","family","other"].indexOf(d.speaker)<0?"other":d.speaker;var nm=sp[d.speaker]||({doctor:"医師",patient:"患者",nurse:"看護師",family:"家族",other:"その他"})[k];return '<div class="msg '+k+'"><div class="who">'+esc(nm)+'</div><div class="t">'+esc(d.text)+'</div></div>'}).join("")+'</div>';
}
function spOrig(c){return c.speakers_original||{doctor:"Doctor",patient:"Patient",nurse:"Nurse",family:"Family",other:"Other"}}
function openCase(c){
  var l=langOf(c),s=c.source||{};
  var h='<div class="panel"><div class="ph"><div><h2>'+esc(c.title)+'</h2><div class="badges"><span class="b cat" style="background:'+(COL[c.category]||COL["その他"])+'">'+esc(c.category||"その他")+'</span>'+(c.setting?'<span class="b">'+esc(c.setting)+'</span>':'')+(c.record_type?'<span class="b">'+esc(c.record_type)+'</span>':'')+(c.tags||[]).map(function(t){return'<span class="b">#'+esc(t)+'</span>'}).join("")+'</div></div><button class="x" id="closeD">閉じる</button></div><div class="pb">';
  if(isLink(c)){
    var u=s.item_url||s.url||"";
    h+='<div class="linkonly"><p>'+esc(c.summary||"")+'</p>'+(u?'<a href="'+esc(u)+'" target="_blank" rel="noopener">元のページを開く ↗</a>':'')+'</div><div class="mt">著作権の都合で本文は掲載せず，リンクのみ紹介しています．</div>';
  }else{
    var hasOrig=c.translated&&((c.dialogue_original||[]).length||Object.keys(c.soap_original||{}).length);
    if(hasOrig){h+='<div class="bar"><div class="seg" id="modeSeg"><button data-m="ja">日本語訳</button><button data-m="en">英語原文</button><button data-m="both">並べて表示</button></div><span class="mt">日本語訳は機械翻訳（Claude 訳）です．正確な内容は英語原文をご確認ください．</span></div>'}
    h+='<div class="tabs seg" id="tabSeg"><button data-t="d" class="on">対話</button><button data-t="s">SOAP</button></div><div id="body"></div>';
  }
  h+='<div class="foot"><div>出典：'+(s.url?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.name)+'</a>':esc(s.name||""))+(s.item_url&&!isLink(c)?' ・ <a href="'+esc(s.item_url)+'" target="_blank" rel="noopener">元データ</a>':'')+'</div><div>ライセンス：'+esc(s.license||"未記載")+'</div>'+(s.citation?'<div>引用：'+esc(s.citation)+'</div>':'')+(c.notes?'<div>備考：'+esc(c.notes)+'</div>':'')+(c.note_original_raw?'<details><summary>元のノート（原文のまま）</summary><pre>'+esc(c.note_original_raw)+'</pre></details>':'')+'</div></div></div>';
  var d=$("detail");d.innerHTML=h;d.hidden=false;document.body.style.overflow="hidden";
  $("closeD").onclick=function(){closeCase(true)};
  if(!isLink(c)){
    detailMode=l==="en"?"en":"ja";
    var seg=$("modeSeg");
    function draw(){
      var m=detailMode,bd=$("body");
      function col(title,dlg,soap,sp,cls){return '<div class="col '+cls+'" data-p="d"><h3>'+title+'・対話</h3>'+chatHtml(dlg,sp)+'</div><div class="col '+cls+'" data-p="s"><h3>'+title+'・SOAP</h3>'+soapHtml(soap)+'</div>'}
      var ja=[c.dialogue,c.soap,c.speakers],en=[c.dialogue_original,c.soap_original,spOrig(c)];
      var inner;
      if(m==="both"&&hasOrig){
        inner='<div class="cols3"><div class="col"><h3>日本語訳 対話</h3>'+chatHtml(ja[0],ja[2])+'</div><div class="col"><h3>英語原文 対話</h3>'+chatHtml(en[0],en[2])+'</div><div class="col"><h3>日本語訳 SOAP</h3>'+soapHtml(ja[1])+'</div><div class="col"><h3>英語原文 SOAP</h3>'+soapHtml(en[1])+'</div></div>';
        bd.innerHTML=inner;bd.className="both";
      }else{
        var x=(m==="en"&&hasOrig)?en:ja;
        bd.className="";
        bd.innerHTML='<div class="cols"><div class="col show" data-p="d"><h3>対話</h3>'+chatHtml(x[0],x[2])+'</div><div class="col" data-p="s"><h3>SOAP</h3>'+soapHtml(x[1])+'</div></div>';
        tab(window.__tab||"d");
      }
      if(seg)Array.prototype.forEach.call(seg.children,function(b){b.className=b.getAttribute("data-m")===m?"on":""});
    }
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
  d.scrollTop=0;
}
var opened=false;
function closeCase(push){
  var d=$("detail");d.hidden=true;d.innerHTML="";document.body.style.overflow="";
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
$("reset").onclick=function(){st={cat:"",lang:"",rec:"",set:"",src:"",body:"",q:"",shown:PAGE};$("q").value="";refresh()};
var tm;$("q").oninput=function(){clearTimeout(tm);tm=setTimeout(function(){st.q=$("q").value;refresh()},200)};
$("menuBtn").onclick=function(){$("side").classList.toggle("open")};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("detail").hidden)closeCase(true)});
$("detail").addEventListener("click",function(e){if(e.target===$("detail"))closeCase(true)});
window.addEventListener("hashchange",route);
$("total").textContent="全 "+ALL.length+" 件";
refresh();route();
})();
