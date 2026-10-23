/* 確認済み表示の共通部品（看護計画・SOAP 例・模擬対話の 3 ビューアで共用）
 * 事例・計画ごとの「確認完了」を Apps Script（review_sync/Code.gs）へ送り，全員分の一覧を読み戻す．
 *   ReviewDone.init({url, key, onChange})  … 送信先を設定し，一覧を読み込む（読めたら onChange()）
 *   ReviewDone.names(key)                    … その対象を確認した人の名前の配列
 *   ReviewDone.badge(key)                    … 一覧カード用の「✓ 確認済み（○○様）」HTML（未確認なら ""）
 *   ReviewDone.guard(key, me, onGo, onBack)  … 他の人が確認済みなら確かめるポップアップを出す
 *   ReviewDone.mark(key, entity, me, done)   … 確認完了（done=false で取り消し）を送る
 * key は "plan/<ref>"・"soap/<事例ID>"・"ndlg/<事例ID>" の形．送信時は末尾に "/__done" を付ける．
 * 文言は句読点「，．」で統一する．
 */
(function () {
  var S = { url: "", key: "", map: {}, onChange: null, loaded: false };
  var LS = "reviewdone:";   // 自分の操作を一覧が届く前でも反映するための控え

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(LS + k) || "null"); } catch (_) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(LS + k); else localStorage.setItem(LS + k, JSON.stringify(v)); } catch (_) {} }
  function device() {
    try { var d = localStorage.getItem("reviewdone_device"); if (!d) { d = Math.random().toString(36).slice(2, 10); localStorage.setItem("reviewdone_device", d); } return d; } catch (_) { return ""; }
  }
  function changed() { if (S.onChange) try { S.onChange(); } catch (e) { console.error(e); } }

  function names(key) {
    var list = (S.map[key] || []).map(function (x) { return x.name; });
    var mine = lsGet(key);   // {name, done}
    if (mine && mine.name) {
      var i = list.indexOf(mine.name);
      if (mine.done && i < 0) list.push(mine.name);
      if (!mine.done && i >= 0) list.splice(i, 1);
    }
    return list;
  }

  function load() {
    if (!S.url || !S.key) return;
    fetch(S.url + (S.url.indexOf("?") < 0 ? "?" : "&") + "a=done&k=" + encodeURIComponent(S.key), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.ok || !j.done) return;
        S.map = j.done; S.loaded = true;
        // サーバー側に反映済みの控えは消す
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf(LS) !== 0) return;
          var key = k.slice(LS.length), mine = lsGet(key), has = (S.map[key] || []).some(function (x) { return mine && x.name === mine.name; });
          if (mine && mine.done === has) lsSet(key, null);
        });
        changed();
      })
      .catch(function (e) { console.warn("確認済み一覧を読めませんでした", e); });
  }

  function badge(key) {
    var n = names(key);
    if (!n.length) return "";
    return '<span class="rd-badge" title="確認済み：' + esc(n.join("，")) + '">✓ 確認済み（' + esc(n.map(function (x) { return x + "様"; }).join("・")) + "）</span>";
  }

  function modal(html, buttons) {
    var o = document.createElement("div");
    o.className = "rd-ov";
    o.innerHTML = '<div class="rd-box" role="dialog" aria-modal="true">' + html + '<div class="rd-btns">' +
      buttons.map(function (b, i) { return '<button class="rd-btn' + (b.primary ? " rd-pri" : "") + '" data-i="' + i + '">' + esc(b.label) + "</button>"; }).join("") + "</div></div>";
    o.addEventListener("click", function (e) {
      var b = e.target.closest(".rd-btn");
      if (!b) return;
      document.body.removeChild(o);
      var f = buttons[+b.getAttribute("data-i")].fn; if (f) f();
    });
    document.body.appendChild(o);
    var p = o.querySelector(".rd-pri"); if (p) p.focus();
  }

  // 自分以外が確認済みなら「既に○○様によって確認済みです」と確かめる
  function guard(key, me, onGo, onBack) {
    var others = names(key).filter(function (x) { return x !== me; });
    if (!others.length) { onGo(); return; }
    modal('<p class="rd-t">既に <b>' + esc(others.map(function (x) { return x + "様"; }).join("・")) + "</b> によって確認済みです．</p>" +
      '<p class="rd-s">まだ確認されていないものを優先していただけると助かります．このまま確認してもかまいません．</p>',
      [{ label: "一覧に戻る", fn: onBack }, { label: "このまま確認する", primary: true, fn: onGo }]);
  }

  function mark(key, entity, me, done) {
    lsSet(key, { name: me, done: !!done });
    changed();
    if (!S.url || !S.key) return;
    var ev = { path: key + "/__done", entity: entity, label: "確認完了", text: "", status: done ? "done" : "undone", proposal: "", comment: "", reviewer: me, ts: new Date().toISOString() };
    fetch(S.url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ k: S.key, device: device(), events: [ev] }) })
      .then(function () { setTimeout(load, 1500); })
      .catch(function (e) { console.warn("確認完了を送れませんでした", e); });
  }

  var css = document.createElement("style");
  css.textContent =
    ".rd-badge{display:inline-block;background:#e7f6ec;color:#17663a;border:1px solid #9fd8b2;border-radius:999px;padding:1px 10px;font-size:12.5px;font-weight:600;white-space:nowrap}" +
    ".rd-ov{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}" +
    ".rd-box{background:#fff;color:#1a1a1a;border-radius:14px;max-width:420px;width:100%;padding:22px 22px 16px;box-shadow:0 10px 40px rgba(0,0,0,.25);font-size:15px;line-height:1.7}" +
    ".rd-t{margin:0 0 8px;font-size:16.5px}.rd-s{margin:0 0 16px;color:#555;font-size:14px}" +
    ".rd-btns{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}" +
    ".rd-btn{border:1px solid #c5ccd6;background:#fff;border-radius:10px;padding:10px 16px;font-size:15px;cursor:pointer;min-height:44px}" +
    ".rd-btn.rd-pri{background:#0f766e;border-color:#0f766e;color:#fff;font-weight:600}";
  (document.head || document.documentElement).appendChild(css);

  window.ReviewDone = {
    init: function (o) { S.url = o.url || ""; S.key = o.key || ""; S.onChange = o.onChange || null; load(); setInterval(load, 120000); },
    reload: load, names: names, badge: badge, guard: guard, mark: mark, modal: modal,
    // prefix（"plan/" など）で始まる確認済みの対象の数（ポータルの進み具合表示用）
    count: function (prefix) { return Object.keys(S.map).filter(function (k) { return k.indexOf(prefix) === 0 && names(k).length; }).length; },
    loaded: function () { return S.loaded; }
  };
})();
