/* 確認済み表示の共通部品（看護計画・SOAP 例・模擬対話の 3 ビューアで共用）
 * 事例・計画ごとの「確認完了」を Apps Script（review_sync/Code.gs）へ送り，人数だけを読み戻す．
 * 他の方のお名前は画面にもサーバーの応答にも出さない（2026-11-05 病院からの依頼：履歴が全スタッフに見えないように）．
 *   ReviewDone.init({url, key, onChange, me})  … 送信先を設定し，一覧を読み込む（読めたら onChange()）．me は自分の名前を返す関数
 *   ReviewDone.n(key)                         … その対象を確認した人数（自分を含む）
 *   ReviewDone.mine(key, me)                  … 自分が確認済みか
 *   ReviewDone.others(key, me)                … 自分以外で確認した人数
 *   ReviewDone.badge(key)                     … 一覧カード用の「✓ 確認済み（○名）」HTML（未確認なら ""）
 *   ReviewDone.whoText(key, me)               … 詳細画面用の「ほかに ○名の方が確認済みです」（いなければ ""）
 *   ReviewDone.guard(key, me, onGo, onBack)   … 他の人が確認済みなら確かめるポップアップを出す
 *   ReviewDone.mark(key, entity, me, done)    … 確認完了（done=false で取り消し）を送る
 *   ReviewDone.count(prefix)                  … prefix で始まる対象のうち確認済みのものの数
 * key は "plan/<ref>"・"soap/<事例ID>"・"ndlg/<事例ID>" の形．送信時は末尾に "/__done" を付ける．
 * 文言は句読点「，．」で統一する．
 */
(function () {
  var S = { url: "", key: "", n: {}, mine: {}, me: null, onChange: null, loaded: false, loading: false, meFn: null };
  var LS = "reviewdone:";   // 自分の操作を一覧が届く前でも反映するための控え

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(LS + k) || "null"); } catch (_) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(LS + k); else localStorage.setItem(LS + k, JSON.stringify(v)); } catch (_) {} }
  function device() {
    try { var d = localStorage.getItem("reviewdone_device"); if (!d) { d = Math.random().toString(36).slice(2, 10); localStorage.setItem("reviewdone_device", d); } return d; } catch (_) { return ""; }
  }
  function curMe() {
    var v = "";
    if (S.meFn) try { v = S.meFn() || ""; } catch (_) {}
    if (!v) try { v = localStorage.getItem("review_name") || ""; } catch (_) {}
    return String(v).trim();
  }
  function changed() { if (S.onChange) try { S.onChange(); } catch (e) { console.error(e); } }

  // サーバーが返した「自分の確認済み」は，読み込んだ時の名前のものだけ使える
  function srvMine(key, me) { return S.me === me && !!S.mine[key]; }

  function mine(key, me) {
    me = me == null ? curMe() : String(me).trim();
    if (!me) return false;
    if (S.loaded && S.me !== me && !S.loading) load();   // 名前が変わったら自分の分を読み直す
    var loc = lsGet(key);
    if (loc && loc.name === me) return !!loc.done;
    return srvMine(key, me);
  }

  function n(key) {
    var c = S.n[key] || 0, loc = lsGet(key);
    if (loc && loc.name && S.me === loc.name) {   // 送信直後でサーバーにまだ反映されていない自分の操作を足し引きする
      var sm = !!S.mine[key];
      if (loc.done && !sm) c++;
      if (!loc.done && sm) c--;
    } else if (loc && loc.name && loc.done && !c) c = 1;
    return Math.max(0, c);
  }

  function others(key, me) { return Math.max(0, n(key) - (mine(key, me) ? 1 : 0)); }

  function load() {
    if (!S.url || !S.key) return;
    var me = curMe();
    S.loading = true;
    fetch(S.url + (S.url.indexOf("?") < 0 ? "?" : "&") + "a=done2&k=" + encodeURIComponent(S.key) + "&me=" + encodeURIComponent(me), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        S.loading = false;
        if (!j || !j.ok || !j.n) return;
        S.n = j.n; S.mine = {}; (j.mine || []).forEach(function (k) { S.mine[k] = true; });
        S.me = me; S.loaded = true;
        // サーバー側に反映済みの控えは消す
        try {
          Object.keys(localStorage).forEach(function (k) {
            if (k.indexOf(LS) !== 0) return;
            var key = k.slice(LS.length), loc = lsGet(key);
            if (loc && loc.name === me && !!loc.done === !!S.mine[key]) lsSet(key, null);
          });
        } catch (_) {}
        changed();
      })
      .catch(function (e) { S.loading = false; console.warn("確認済み一覧を読めませんでした", e); });
  }

  function badge(key) {
    var c = n(key);
    if (!c) return "";
    return '<span class="rd-badge" title="確認済み ' + c + ' 名">✓ 確認済み（' + c + " 名）</span>";
  }

  function whoText(key, me) {
    var o = others(key, me);
    return o ? "ほかに " + o + " 名の方が確認済みです" : "";
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

  // 自分以外が確認済みなら「既に○名の方が確認済みです」と確かめる（お名前は出さない）
  function guard(key, me, onGo, onBack) {
    var o = others(key, me);
    if (!o) { onGo(); return; }
    modal('<p class="rd-t">既に <b>' + o + " 名の方</b>が確認済みです．</p>" +
      '<p class="rd-s">まだ確認されていないものを優先していただけると助かります．このまま確認してもかまいません．</p>',
      [{ label: "一覧に戻る", fn: onBack }, { label: "このまま確認する", primary: true, fn: onGo }]);
  }

  function mark(key, entity, me, done) {
    me = String(me || "").trim();
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
    init: function (o) { S.url = o.url || ""; S.key = o.key || ""; S.onChange = o.onChange || null; S.meFn = o.me || null; load(); setInterval(load, 120000); },
    reload: load, n: n, mine: mine, others: others, badge: badge, whoText: whoText, guard: guard, mark: mark, modal: modal,
    // prefix（"plan/" など）で始まる確認済みの対象の数（ポータルの進み具合表示用）
    count: function (prefix) {
      var ks = {}; Object.keys(S.n).forEach(function (k) { ks[k] = 1; });
      try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(LS) === 0) ks[k.slice(LS.length)] = 1; }); } catch (_) {}
      return Object.keys(ks).filter(function (k) { return k.indexOf(prefix) === 0 && n(k) > 0; }).length;
    },
    loaded: function () { return S.loaded; }
  };
})();
