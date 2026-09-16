# 看護計画レビュー（app/index.html）

標準看護計画（褥瘡・転倒転落・せん妄）と循環器疾患別の観察項目・ケア・指導リストを眺め，病院スタッフが内容を確認するための単体 HTML です．`index.html` をブラウザで開くだけで動きます（サーバ・ネット接続不要）．

## 病院スタッフの方へ（使い方）

1. `index.html` をダブルクリックして開く（Chrome／Edge／Safari）
2. 右上の「レビュアー」欄にお名前を入れる（一度入れれば記憶されます）
3. 左の一覧から疾患（または「標準看護計画」）を選ぶ．検索欄に病名・別名・本文の語を入れると絞り込めます（`/` キーで検索欄へ）
4. 各行の右端の **OK**／**修正案**／**不要** を押す．「修正案」を押すと書き換え後の文言とコメントを入力できます．もう一度押すと取り消せます
5. 全項目を見終えたら右上の「この疾患を確認済にする」を押すと，未レビューの行がまとめて OK になります（取り消しも可）
6. 左の「未確認／確認済／要修正」で一覧を絞り込めます．ダッシュボードで全体の進捗が見られます
7. レビュー結果はこのブラウザの中（localStorage）に保存されます．**別のパソコンや担当者へ渡すときは右上「書き出す」で JSON ファイルにして送ってください**．受け取った側は「読み込む」で取り込めます（同じ項目は新しい方が採用されます）
8. 「Markdown」を押すとレビュー結果が文章としてコピーされ，メールやチャットに貼り付けられます
9. 「印刷」で表示中の疾患だけを A4 に印刷できます（全タブの内容が入ります）
10. 内容は AI が著作権フリー素材と看護知識から書いた**たたき台**です．診療上の判断を示すものではなく，施設の手順・様式に合わせた修正を前提にしています

## 開発者向け

### 再ビルド

```
cd .output/nursing_plans
python3 _build_app.py
```

- `standard_care_plans.json`（meta の正本）＋ `care_plans_part*.json`（`{"meta":..,"plans":[..]}` 形式，glob で全 part）＋ `diseases_part*.json`（glob で全 part）を読み，`app/template.html` の `/*__DATA__*/` に JSON を埋め込んで `app/index.html` を生成します．part が増えても再実行するだけで反映されます
- 標準看護計画を追加するときは `care_plans_partN.json` を新規作成し `{"meta":{}, "plans":[...]}` の形式で `plans` に `group`（例「安全・リスク」）付きの計画を並べる．`group` はサイドバーの折りたたみ区分になる
- id が重複した場合は後勝ちで警告を出します．テンプレートに「、」「。」があれば警告します
- 見た目・機能の修正は `app/template.html` を編集して再ビルドしてください（`index.html` は生成物）
- 外部 CDN・Web フォント・fetch は使っていません（file:// で動作）

### URL ハッシュ

- `#dash` ダッシュボード／`#d/<疾患id>`（例 `#d/acute_mi`）／`#p/<計画id>`（例 `#p/fall_risk`）
- 疾患はタブも指定可：`#d/acute_mi/red`（obs／red／care／edu／goal／src）

### レビュー結果の保存形式

localStorage のキーは `nursing-review:<item_path>`．`item_path` は `d/<疾患id>/<フィールド>[/<index>]`，`p/<計画id>/<フィールド>[/<index>]`（例 `d/acute_mi/red_flags/1`，`p/fall_risk/assessment/scales/0`，`d/acute_mi/overview`）．

```json
{
  "status": "ok | fix | drop",
  "proposal": "修正後の文言（fix のとき）",
  "comment": "コメント",
  "reviewer": "レビュアー名",
  "ts": "2026-09-15T13:16:00.000Z",
  "text": "レビュー時点の元の文言",
  "bulk": true
}
```

`bulk` は「確認済にする」で一括付与された OK の印（取り消し時にまとめて戻す）．
メタ情報は `nursing-review:_reviewer`，`_theme`，`_recent`，`_entity:<ref>`（`{confirmed, reviewer, ts}`）．

### 書き出し JSON（`nursing-review_<名前>_<日付>.json`）

```json
{
  "format": "nursing-review/1",
  "exported": "ISO 日時",
  "reviewer": "名前",
  "built": "ビルド日時",
  "item_count": 12,
  "entities": { "d/acute_mi": { "confirmed": true, "reviewer": "…", "ts": "…" } },
  "items": { "d/acute_mi/red_flags/1": { "status": "fix", "proposal": "…", "comment": "…", "reviewer": "…", "ts": "…", "text": "…" } }
}
```

読み込み時は `items` を項目ごとにマージ（既存より `ts` が新しいものだけ上書き），`entities` の確認済フラグは上書きします．

### 検証

`python3 _build_app.py` 後，Playwright（pyenv 3.10）で検索・タブ切替・レビュー保存・書き出し／読み込み・印刷（`emulate_media('print')`）・スマホ幅を確認．スクリーンショットは `_screenshot.png`（疾患ページ），`_screenshot_plan.png`，`_screenshot_dark.png`，`_screenshot_mobile.png`．
