# 看護計画（褥瘡・転倒・せん妄）・循環器観察項目リスト 素材ライセンス調査

- 調査日：2026-09-15
- 方法：各素材のライセンス表示ページ・PDF を curl / WebFetch で直接取得し，原文を引用．取得できなかったものは「取得失敗（URL）」と明記し，推測で判定していない．
- 判定尺度：**1** 再利用NG（要ライセンス）／**2** 引用のみ／**3** 非商用・改変不可／**4** 非商用なら改変可／**5** 商用OK
- 注意：本ファイルは法的助言ではない．最終判断は各ライセンス原文で行うこと．

---

## 1. Open RN（Chippewa Valley Technical College／WisTech Open）

### 1.1 ライセンス（各書の Book Information 欄，原文）

| 書名 | URL | ライセンス表示（原文） | 発行 |
|---|---|---|---|
| Nursing Fundamentals 2e | https://wtcs.pressbooks.pub/nursingfundamentals/ | "Nursing Fundamentals 2e Copyright © 2024 by WisTech Open is licensed under a Creative Commons Attribution 4.0 International License, except where otherwise noted." | 2024-12-01，Ebook ISBN 978-1-957068-13-8 |
| Nursing Skills 2e | https://wtcs.pressbooks.pub/nursingskills/ | "Nursing Skills 2e Copyright © 2023 by WisTech Open is licensed under a Creative Commons Attribution 4.0 International License, except where otherwise noted." | 2023-08-28，Ebook ISBN 978-1-957068-10-7 |
| Nursing: Mental Health and Community Concepts 2e | https://wtcs.pressbooks.pub/nursingmhcc/ | "Nursing Mental Health and Community Concepts 2e Copyright © 2025 by WisTech Open is licensed under a Creative Commons Attribution 4.0 International License, except where otherwise noted." | 2025-11-01，Ebook ISBN 978-1-957068-34-3 |
| Health Alterations | https://wtcs.pressbooks.pub/healthalts/ （※ `/healthalterations/` は 404） | "Health Alterations Copyright © 2025 by WisTech Open is licensed under a Creative Commons Attribution 4.0 International License, except where otherwise noted." | 2024-09-01，Ebook ISBN 978-1-957068-12-1 |
| Nursing Management and Professional Concepts 2e | https://wtcs.pressbooks.pub/nursingmpc/ | "Nursing Management and Professional Concepts 2e Copyright © 2024 by WisTech Open is licensed under a Creative Commons Attribution 4.0 International License, except where otherwise noted." | 2024-08-31，Ebook ISBN 978-1-957068-16-9 |

編者：Kimberly Ernstmeyer, MSN, RN, CNE, CHSE, APNP-BC ／ Elizabeth Christman, DNP, RN, CNE．Institution: Chippewa Valley Technical College．Publisher: WisTech Open．

**判定：5（商用OK，CC BY 4.0）**．ただし "except where otherwise noted" の例外に注意（下記 1.3）．

### 1.2 該当章と分量（本文を curl で取得し語数を概算．ナビ・用語集を含むため ±10% 程度の誤差）

| テーマ | 書・章 | URL | 概算語数 |
|---|---|---|---|
| 褥瘡（皮膚統合性） | Nursing Fundamentals 2e, Chapter 10: Integumentary（10.1 Introduction／10.2 Basic Concepts／10.3 Wounds／10.4 Pressure Injuries／10.5 Braden Scale／10.6 Applying the Nursing Process／10.7 Putting It All Together／10.8 Learning Activities） | 10.4 https://wtcs.pressbooks.pub/nursingfundamentals/chapter/10-4-pressure-injuries/ ／ 10.5 https://wtcs.pressbooks.pub/nursingfundamentals/chapter/10-5-braden-scale/ ／ 10.6 https://wtcs.pressbooks.pub/nursingfundamentals/chapter/10-6-applying-the-nursing-process/ | 10.2 ≈3,700語，10.4 ≈2,400語，10.5 ≈3,400語（Braden 表を含む），10.6 ≈3,350語 |
| 転倒（Safety） | Nursing Fundamentals 2e, Chapter 5: Safety（5.1〜5.11．5.6 Preventing Falls，5.7 Restraints，5.8 Safety Considerations Across the Life Span，5.9 Environmental Safety） | https://wtcs.pressbooks.pub/nursingfundamentals/chapter/5-6-preventing-falls/ | 5.6 ≈2,300語 |
| せん妄（Cognition） | Nursing Fundamentals 2e, Chapter 6: Cognitive Impairments（6.1 Introduction／6.2 Basic Concepts（delirium・dementia・depression の鑑別を含む）／6.3 Alzheimer's Disease／6.4 Applying the Nursing Process／6.5／6.6） | 6.2 https://wtcs.pressbooks.pub/nursingfundamentals/chapter/6-2-basic-concepts/ ／ 6.4 https://wtcs.pressbooks.pub/nursingfundamentals/chapter/6-4-applying-the-nursing-process/ | 6.2 ≈3,760語，6.4 ≈1,300語 |
| 循環器（観察項目） | Health Alterations, Chapter 5 Cardiovascular Alterations（5.1〜5.15：5.3 General Cardiovascular System Assessment，5.5 Hypertension，5.7 CAD，5.8 Heart Failure，5.9 PAD，5.11 DVT，5.12 Aneurysm，5.13 Infective Endocarditis 等） | 5.3 https://wtcs.pressbooks.pub/healthalts/chapter/5-3-general-cardiovascular-system-assessment/ ／ 5.8 https://wtcs.pressbooks.pub/healthalts/chapter/5-8-heart-failure/ | 5.3 ≈7,600語，5.8 ≈2,700語 |
| 循環器（アセスメント手技） | Nursing Skills 2e, Chapter 9 Cardiovascular Assessment（9.1〜9.7：9.3 Cardiovascular Assessment，9.4 Sample Documentation，9.5 Checklist） | 9.3 https://wtcs.pressbooks.pub/nursingskills/chapter/9-3-cardiovascular-assessment/ ／ 9.5 https://wtcs.pressbooks.pub/nursingskills/chapter/9-5-checklist-for-cardiovascular-assessment/ | 9.3 ≈5,600語，9.5 ≈470語 |

Nursing Skills 2e には Chapter 14 Integumentary Assessment，Chapter 20 Wound Care もある（目次で確認．分量未計測）．

### 1.3 NANDA-I と Braden の扱い（本文の原文）

- 4.4 Diagnosis（https://wtcs.pressbooks.pub/nursingfundamentals/chapter/4-4-diagnosis/）：
  > "Currently, there are over 220 NANDA-I nursing diagnoses developed by nurses around the world. ... A list of commonly used NANDA-I diagnoses is listed in Appendix A. For a full list of NANDA-I nursing diagnoses, refer to a current nursing care plan reference."
- Appendix A: Sample NANDA-I Diagnoses（https://wtcs.pressbooks.pub/nursingfundamentals/back-matter/appendix-a-sample-nanda-i-diagnoses/）：
  > "Table A contains selected, commonly used NANDA-I 2021-2023 nursing diagnoses related to concepts discussed in this book. ... For more information, refer to a current nursing care planning resource."
  出典脚注：Herdman, T. H., Kamitsuru, S., & Lopes, C. T. (Eds.). (2021). Nursing diagnoses: Definitions and classification 2021–2023 (12th ed.). Thieme Publishers New York.
  → **NANDA-I からの使用許諾を受けた旨の断り書きは無い**．引用（出典明記）として掲載している形．10.6e・6.4 の「Diagnoses」表も同じ脚注．
- 10.5 Braden Scale の表（Table 10.5a）：
  > "*Used under Fair Use" ／ 脚注 "This work is derivative of the 'Braden Scale' by Prevention Plus. Used under Fair Use."
  → **Braden 表は CC BY の対象外**（"except where otherwise noted" の例外）．Open RN を土台にしても Braden 表は転載できない．

---

## 2. OpenStax 看護シリーズ

### 2.1 各書の表紙裏（Preface ページ）の原文

| 書名 | URL | ライセンス文（原文） |
|---|---|---|
| Fundamentals of Nursing | https://openstax.org/books/fundamentals-nursing/pages/preface | "Fundamentals of Nursing is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA) license, which means that you can non-commercially distribute, remix, and build upon the content, as long as you provide attribution to OpenStax and its content contributors, and distribute all derivatives under the same license." |
| Clinical Nursing Skills | https://openstax.org/books/clinical-nursing-skills/pages/preface | "Clinical Nursing Skills is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA) license, ..." |
| Medical-Surgical Nursing | https://openstax.org/books/medical-surgical-nursing/pages/preface | "Medical-Surgical Nursing is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA) license, ..." |
| Pharmacology for Nurses | https://openstax.org/books/pharmacology/pages/preface | "Pharmacology for Nurses is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY NC-SA) license, ..." |

4 書すべてのページ末尾（Citation/Attribution 欄）に **AI／LLM に関する追加条件**：
> "This book may not be used in the training of large language models or otherwise be ingested into large language models or generative AI offerings without OpenStax's permission."

### 2.2 openstax.org/license

- https://openstax.org/license は JavaScript 描画のため本文を直接取得できず．CMS API（https://openstax.org/apps/cms/api/v2/pages/126/）で本文を取得：
  > "Our licensing has recently changed. Read this blog post for more details."（リンク先 https://openstax.org/blog/openstax-licensing/）
- ブログ記事「An update on OpenStax licensing」（公開 2026-04-22，CMS API https://openstax.org/apps/cms/api/v2/pages/963/ で本文取得）原文：
  > "OpenStax has transitioned our textbook library from a mix of CC BY and CC BY-NC-SA licensing to CC BY-NC-SA licensing across the library. This change will apply to all newly released and updated versions of our titles, with limited exceptions."
  > "No action is needed by anyone who has previously created derivatives of CC BY content."
  > "In the current environment, highly permissive licenses unintentionally limit our ability to sustain, steward, and guide responsible use of our work."

**判定：4（非商用なら改変可．CC BY-NC-SA 4.0）＋ LLM への投入・学習は OpenStax の許可が必要**．smart_hospital デモが商用・LLM 連携である場合は使わない方が安全．

---

## 3. 米国政府資料（AHRQ／CDC／HHS／NIA）

### 3.1 AHRQ

- **Preventing Falls in Hospitals: A Toolkit for Improving Quality of Care**（PDF 202 ページ）https://www.ahrq.gov/sites/default/files/publications/files/fallpxtoolkit_0.pdf
  > "This document is in the public domain and may be used and reprinted without special permission. Citation of the source is appreciated."
  ただし同 PDF 内の第三者ツールは別扱い：
  > （p.50）"Please fill out the Partners HealthCare Morse Fall Scale Competency Request Form at www.brighamandwomens.org/.../Permissions/PHS%20MFS%20Competency.pdf prior to use."
  > （p.155，STRATIFY）"Reprinted with the permission of Cambridge ..."
  > （p.157）"Reference: Used with permission: Beasley B, Patatanian E. ..."
  ツールキットの HTML 版 https://www.ahrq.gov/patient-safety/settings/hospital/fall-prevention/toolkit/index.html は WebFetch 403／curl 202（bot チャレンジ）で本文取得失敗．
- **Preventing Pressure Ulcers in Hospitals: A Toolkit**：HTML 目次ページ https://www.ahrq.gov/patient-safety/settings/hospital/resource/pressureulcer/tool/index.html は取得できたが本文（著作権表示・Braden の扱い）は JS 描画で抽出できず．PDF https://www.ahrq.gov/sites/default/files/publications/files/putoolkit.pdf は **取得失敗（curl 202 bot チャレンジ×3回，WebFetch 403）**．Open RN 10.5 が同ツールキット（2014）を出典に挙げている．
- AHRQ サイト全体の著作権ポリシーページ：https://www.ahrq.gov/policy/electronic/about/policy.html は 404，https://www.ahrq.gov/policy/electronic/index.html は 403，https://archive.ahrq.gov/policy/electronic/copyright/copyright.html は DNS 解決不可．**取得失敗**．

**判定：5（転倒ツールキット PDF 本体はパブリックドメイン，出典明記が望ましい）**．ただし Morse・STRATIFY 等の埋め込みツールは各権利者の条件に従う．褥瘡ツールキットは同一発行元だが原文未確認のため保留（5 と推定するが未検証）．

### 3.2 CDC STEADI

- CDC 資料利用ポリシー https://www.cdc.gov/other/agencymaterials.html（原文）：
  > "Most of the information on the CDC and ATSDR websites is not subject to copyright, is in the public domain, and may be freely used or reproduced without obtaining copyright permission."
  条件（原文要旨，同ページ）：(1) "Attribution to the agency that developed the material must be provided"（例 "Source: CDC"）；(2) 利用が "does not imply endorsement by CDC, ATSDR, HHS or the United States Government" である旨の免責表示；(3) **"You may not change the substantive content of the materials"**；(4) "You must state that the material is otherwise available on the agency website for no charge"．例外：契約業者・被助成者・第三者ライセンス素材，州・地方政府の著作物，CDC ロゴ．
- STEADI トップ https://www.cdc.gov/steadi/index.html，臨床資料一覧 https://www.cdc.gov/steadi/hcp/clinical-resources/index.html（WebFetch で取得）．主要 PDF：Algorithm `/steadi/media/pdfs/STEADI-Algorithm-508.pdf`，Pocket Guide `/steadi/media/pdfs/steadi-pocketguide-508.pdf`，TUG `/steadi/media/pdfs/STEADI-Assessment-TUG-508.pdf`，30-Second Chair Stand `/steadi/media/pdfs/STEADI-Assessment-30Sec-508.pdf`，4-Stage Balance `/steadi/media/pdfs/STEADI-Assessment-4Stage-508.pdf`，Stay Independent `/steadi/pdf/steadi-brochure-stayindependent-508.pdf`．PDF 本体は curl 403 で **取得失敗**（ページ上には個別の著作権表示なし）．

**判定：5（商用可，パブリックドメイン）だが「実質的内容の改変不可」＋出典・免責表示が条件**．観察項目の抽出・翻訳は可，STEADI の名称で改変版を配るのは不可．

### 3.3 HHS

- https://www.hhs.gov/web/policies-and-standards/hhs-web-policies/content-requirements-and-best-practices/copyright/index.html → WebFetch 403，curl 403．**取得失敗**．

### 3.4 NIA（National Institute on Aging）

- ポリシー https://www.nia.nih.gov/about/policies（原文）：
  > "Reuse of text: Unless otherwise indicated, text within materials on the NIA website is in the public domain and may be reused without our permission. Credit the 'National Institute on Aging, National Institutes of Health' as the source."
  > "Translations of NIA materials: We welcome translation of NIA materials into languages other than English. Translated products may not use the NIA logo and must state: 'Translated by [your organization's name] from material by the National Institute on Aging, National Institutes of Health.'"
  > "Photos and illustrations used in NIA materials are a mix of copyrighted and copyright-free materials."
- せん妄専用ページ：https://www.nia.nih.gov/health/delirium は 404．検索で見つかったのは Cognitive Health and Older Adults（https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults，"Delirium — shows up as a sudden state of confusion, often during a hospital stay, ..." の 1 段落）とニュース記事（https://www.nia.nih.gov/news/dilemma-delirium-older-patients ほか）のみ．**せん妄の独立した患者向け解説ページは確認できず**．

**判定：5（テキストはパブリックドメイン，出典表記）**．ただし素材として薄い．

### 3.5 AHRQ／HHS のせん妄関連資料

- 今回の検索範囲では AHRQ／HHS に「せん妄」専用のツールキットは見つからず（AHRQ 転倒ツールキットに mental status の記述があるのみ）．

---

## 4. 厚生労働省

### 4.1 著作権ポリシー（PDL1.0）

- https://www.mhlw.go.jp/chosakuken/ ：厚生労働省ホームページのコンテンツは「公共データ利用規約（第1.0版）」（PDL1.0）に準拠．出典記載例「出典：厚生労働省ホームページ（当該ページのURL）」．編集・加工時はその旨を明記，国が作成したかのような表示は禁止．適用除外：シンボルマーク・ロゴ・キャラクター，別の利用ルールが明示されたコンテンツ．
- PDL1.0 原文（デジタル庁 https://www.digital.go.jp/resources/open_data/public_data_license_v1.0）：
  > 「当ウェブサイトで公開している情報（以下「コンテンツ」といいます。）は、別の利用ルールが適用されるコンテンツを除き、どなたでも以下の1.1.から1.7.に定める利用ルール（以下「本利用ルール」といいます。）に従って、複製、公衆送信、翻訳・変形等の翻案等、自由に利用できます（本利用ルールに従って利用できるコンテンツを、以下「本コンテンツ」といいます。）。商用利用も可能です。」
  > 「なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、これらについては本利用ルールの適用はなく、自由に利用できます。」
  > 「本コンテンツを編集・加工等して利用する場合は、上記出典とは別に、編集・加工等を行ったこと及びその主体を記載してください。」
  > 「本コンテンツの中には、第三者（国以外の者をいいます。…）が著作権その他の権利を有しているものがあります。…利用者の責任で、当該第三者から利用の許諾を得てください。」

### 4.2 該当様式の所在（令和 8 年度改定版，mhlw.go.jp 上で確認）

令和 8 年度診療報酬改定ページ https://www.mhlw.go.jp/stf/newpage_67729.html からリンク：

| 様式 | 掲載ファイル | 該当ページ（pdftotext で確認） |
|---|---|---|
| 褥瘡対策に関する診療計画書（別紙3） | 「基本診療料の施設基準等及びその届出に関する手続きの取扱いについて」（令和8年3月5日保医発0305第7号）https://www.mhlw.go.jp/content/12400000/001732097.pdf（21.2MB，745p） | p.306「別紙3 褥瘡対策に関する診療計画書（１）」（日常生活自立度，危険因子評価：基本的動作能力・病的骨突出・関節拘縮・栄養状態低下・皮膚湿潤・浮腫…），p.307「（２）」（薬学的管理・栄養管理〔GLIM 基準〕） |
| 一般病棟用の重症度，医療・看護必要度に係る評価票（別紙7） | 同上 | p.358 Ⅰ評価票，p.359 Ⅱ評価票，p.360〜 評価の手引き．別紙18 ハイケアユニット用 p.420 |
| せん妄ハイリスク患者ケア加算に係るチェックリスト（別紙様式7の3） | 「様式（医科）」https://www.mhlw.go.jp/content/12400000/001713885.pdf（9.5MB，101p） | p.19「別紙様式７の３ せん妄ハイリスク患者ケア加算に係るチェックリスト」（リスク因子：70歳以上／脳器質的障害／認知症／アルコール多飲／せん妄の既往／リスクとなる薬剤／全身麻酔手術，対策：見当識の維持，脱水の治療・予防，薬剤の漸減・中止，早期離床，疼痛管理，睡眠管理…） |
| 転倒・転落（医療安全） | 医療安全対策 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryou/i-anzen/index.html（本文に転倒の記述なし）．具体資料：医療安全対策マニュアル例「転倒・転落」https://www.mhlw.go.jp/topics/bukyoku/isei/i-anzen/1/torikumi/naiyou/manual/2j.html（Shift_JIS，要点：転倒・転落の既往・ADL のチェック，物品・設備の点検，危険因子のチェック．エラー発生要因 7 項目と事故防止対策），および老健局「介護保険施設等における事故予防及び事故発生時の対応に関するガイドライン」（令和7年11月）https://www.mhlw.go.jp/content/001569590.pdf（62p） | — |

- 参考（旧版）：平成 30 年 別添6 https://www.mhlw.go.jp/bunya/iryouhoken/iryouhoken15/dl/5-2-2.pdf，令和 4 年 別紙3 は https://www.mhlw.go.jp/content/12404000/000923512.pdf（現在 404）．
- 厚労科研の「転倒・転落防止のための安全対策ガイドライン」https://mhlw-grants.niph.go.jp/system/files/2006/064011/200634062B/200634062B0009.pdf は研究班成果物（著作権表示の抽出不可，PDL の対象外の可能性）．

**判定：5（PDL1.0，商用・翻案可．出典と加工の明記が条件）**．診療報酬様式は国の著作物であり第三者権利の注記なし．「簡単な表」は著作権保護対象外との明文もある．

---

## 5. アセスメントスケールの利用条件

| スケール | 一次情報 URL | 原文引用 | 日本語版 | 判定 |
|---|---|---|---|---|
| **Braden Scale** | https://www.bradenscale.com/ ，https://www.bradenscale.com/acute-care-facilities-hospitals | "Permission to use the Braden Scale II can only be granted through a License Agreement obtained through Health Sense Ai, owner of the Braden Scale© and Braden Scale II© copyrights." ／ "1. To calculate license cost, enter the number of beds at your facility below. 2. To purchase the license by credit card, ..." ／ "Braden Scale II © Acute Care Facility & Hospital Three-Year License"．© 2026 Braden Scale II，Health Sense Ai© PO Box 2800 Benton, AR | 日本語版の記載なし（在宅版・急性期版とも要ライセンス） | **1**（有償ライセンス．Open RN も fair use 扱い） |
| **OH スケール**（大浦・堀田） | https://www.tokozure.info/zyokusou_03.html（堀田予防医学・統合医療研究所） | 著作権・利用条件の記述なし．検索でも一次情報のライセンス表示は見つからず（書籍『日本人の褥瘡危険要因「OHスケール」による褥瘡予防』等）．**利用条件の一次情報は取得失敗** | 日本発 | **判定保留（2 扱い）**：明示的許諾が無いので引用・出典明記に留める |
| **Morse Fall Scale** | Fall TIPS FAQ https://www.falltips.org/faqs/ は接続拒否（ECONNREFUSED）で取得失敗．Wayback Machine 保存版 https://web.archive.org/web/2025/https://www.falltips.org/faqs/ で確認 | "Do I need permission to use the Morse Fall Scale? Use of the Morse Fall Scale is free of charge but permission from the author is required. All permissions should be sent to Dr. Morse at Univ of Utah. janice.morse@nurs.utah.edu" ／ AHRQ 転倒ツールキット p.50 "Please fill out the Partners HealthCare Morse Fall Scale Competency Request Form ... prior to use." | 日本語版の公式記載なし | **3**（無償だが著者許諾が必要．ソフトウェア搭載の可否は許諾次第） |
| **Hendrich II Fall Risk Model** | 公式 https://hendrichfallriskmodel.com/ は 404（WP Engine 未設定），https://www.ahiofindiana.com/ は接続拒否．**取得失敗**．代替一次情報：HIGN "Try This" PDF https://hign.org/sites/default/files/2020-06/Try_This_General_Assessment_8.pdf | "© 2013 AHI of Indiana, Inc. All rights reserved. United States Patent No. 7,282,031 and U.S. Patent No. 7,682,308. Reproduction of copyright and patented materials without authorization is a violation of federal law." ／ "with permission, the Hendrich II Fall Risk Model™ can be inserted into existing electronic health platforms, documentation forms, or used as a single document." | — | **1**（著作権＋特許，要ライセンス） |
| **CAM**（Confusion Assessment Method） | 3D-CAM Training Manual v5.6 https://www.deliriumcentral.org/wp-content/uploads/2024/10/3D-CAM_Training_Manual_Version_5.6-FINAL.pdf ／ 3D-CAM 票 https://www.deliriumcentral.org/wp-content/uploads/2023/03/3D-CAM_Instrument_5.4-final.pdf ／ 日本語版 Short CAM https://www.deliriumcentral.org/wp-content/uploads/2024/04/Japanese-CAM.pdf | "COPYRIGHT: The Confusion Assessment Method (CAM) is copyright 2003, Hospital Elder Life Program, LLC. Not to be reproduced without permission." ／ 日本語版末尾 "Confusion Assessment Method: Training Manual and Coding Guide, Copyright 2003, Hospital Elder Life Program, LLC." "Provided by: Akira Wtanabe"．※ hospitalelderlifeprogram.org は現在 HELP 公式ではない内容（nootropics 広告等）になっており信頼不可．公式 https://help.agscocare.org/ は JS 描画で本文取得失敗．非営利無償との記述は検索スニペットのみで一次確認できず | あり（Short CAM 日本語版，FAM-CAM 日本語版，3D-CAM 日本語版が deliriumcentral.org に掲載） | **2**（許諾なしの再掲載不可） |
| **CAM-ICU**（Vanderbilt） | https://www.icudelirium.org/medical-professionals/delirium/monitoring-delirium-in-the-icu ／ 翻訳一覧 https://www.icudelirium.org/medical-professionals/downloads/resource-language-translations | "We have obtained copyright for the CAM-ICU and its educational materials and have deliberately made it unrestricted in terms of use. We ask that you include the copyright line below on the bottom of the pocket cards and other educational materials, but do not require you to obtain a written letter of permission for implementation and clinical use. Copyright © 2002, E. Wesley Ely, MD, MPH and Vanderbilt University, all rights reserved" ／ "If you would like to use any of these materials for other uses, please con[tact us]" | あり（CAM-ICU Training Manual and FAQ (Japanese)，Validation Paper (Japanese)，ICDSC Pocket Tool (Japanese)） | **4**（臨床導入は無償・許諾不要，著作権表示必須．製品搭載等「other uses」は要連絡） |
| **DST**（せん妄スクリーニング・ツール，町田ら） | http://plaza.umin.ac.jp/~pcpkg/dst.html | 「使用許諾 文献参照」「(c)緩和ケア臨床・研究・教育ツール 無断転載を禁じます。」文献：町田いづみ, 青木孝之, 上月清司, 岸泰宏, 保坂隆. せん妄スクリーニング・ツール(DST)の作成. 総合病院精神医学. 2003; 15(2): 150-5. | 日本発 | **2**（無断転載禁止） |
| **4AT** | https://www.the4at.com/ ／ 再利用条件 https://www.the4at.com/attribution ／ 日本語版 https://www.the4at.com/4at-japanese ／ 翻訳一覧 https://www.the4at.com/4at-translations | "© 2026 the4AT | Except where otherwise stated, content licensed under CC BY 4.0" ／ "Completely free: instant access, no registration required" ／ 再利用ページ：CC BY 4.0 は "permits sharing and adaptation, including commercial use, when its terms are followed"；改変時は "make this clear wherever the material is displayed or distributed, describe the changes, and do not imply that the modified version is the official 4AT"，かつ "the published validation evidence for the official 4AT should not be assumed to apply to this modified version" を明記 | あり（.docx／.pdf で配布．4AT-J の妥当性論文：https://www.sciencedirect.com/science/article/abs/pii/S1876201821003749） | **5** |
| **NEECHAM Confusion Scale** | UNC 配布 PDF https://nursing.unc.edu/wp-content/uploads/2021/07/NEECHAM-Scale01with-copyrt.pdf | "© 1985/89 Neelon/Champagne/McConnell"（利用条件の文言なし） | あり（日本語版 J-NCS：綿貫ら 2001，看護研究 38(6) 等．一次ライセンス情報なし） | **2**（著作権表示のみ，許諾条件不明） |

---

## 6. 日本の学会・団体（比較）

| 団体・資料 | URL | 原文 | 判定 |
|---|---|---|---|
| 日本褥瘡学会「褥瘡予防・管理ガイドライン 第5版」 | 学会ページ https://www.jspu.org/medical/guideline/ ／ Minds https://minds.jcqhc.or.jp/summary/c00726/ ／ サイトポリシー https://www.jspu.org/sitepolicy/ | 学会ページ：「日本褥瘡学会が編集致しました『科学的根拠に基づく褥瘡局所治療ガイドライン』は…MINDS…に掲載されています。」／ Minds：「発行年月日 2022年4月2日 版 第5版 発行元 照林社 発行形式 書籍」「公開ステータス 本文公開交渉中」／ サイトポリシーページは本文空（転載条件の記載なし）．© 2026 Japanese Society of Pressure Ulcers | **2**（書籍・転載条件の明示なし） |
| 日本総合病院精神医学会「せん妄の臨床指針（せん妄の治療指針 第2版）」 | 旧サイト http://psy.umin.ac.jp/（新サイト https://www.jsghp.or.jp/ へ移行案内）／ 発行元 星和書店 https://www.seiwa-pb.co.jp/search/bo05/bn868.html | 学会サイトに指針本文・転載条件の掲載なし．星和書店の書籍（日本総合病院精神医学会治療指針 1） | **2**（市販書籍） |
| 日本看護協会 | https://www.nurse.or.jp/website/ | 「当Webサイトに掲載している記事・写真・イラスト等は著作権法により保護されています。したがって、著作権者に無断で複写、複製、翻訳、転載等することは、法律により禁じられています。」 | **2** |

---

## 7. NANDA-I（現 INKA: International Nursing Knowledge Association）

- Terms of Use https://nanda.org/terms-of-use/（https://nanda.org/terms-and-conditions/ からリダイレクト）原文：
  > "All content ... is owned by the International Nursing Knowledge Association (INKA) (formerly NANDA International) or its licensors and is protected by United States and international copyright laws, database rights, and other applicable intellectual property laws. Except as expressly permitted under these Terms or pursuant to a written license agreement with INKA, no rights are granted to use, reproduce, distribute, modify, adapt, translate, or create derivative works from the Content."
  > "2.3 ... Unless expressly authorized in writing by INKA, you may not: reproduce, publish, distribute, or publicly display the Content; translate, adapt, modify, or create derivative works based on the Content; **incorporate the Content into software, applications, databases, academic platforms, electronic health records, decision-support tools, or other digital systems**; upload or redistribute the Content on third-party websites, repositories, or platforms. Certain uses of Content, including educational, institutional, technical, or commercial applications, may require a formal license. ... Permissions and licensing inquiries should be directed to admin@nanda.org"
  > "2.4 Prohibition on Text Mining and Data Extraction: You may not engage in automated or manual text mining, scraping, data extraction, indexing, or systematic retrieval of Content or structured data for the purpose of reproduction, analysis, redistribution, **training machine learning or artificial intelligence models**, or creating derivative works, unless you have obtained explicit prior written authorization from INKA."
  > "Fair Use and Scholarly Reference: ... scholarly research, academic commentary, criticism, teaching, or citation may be permissible where such use is non-systematic, does not reproduce substantial portions of the Content, ..."
- トップページ脚注 https://nanda.org/ ："Unauthorized use, reproduction, or distribution of the NANDA-I Nursing Diagnosis Classification or NANDA 360, including associated diagnostic labels and indicators, is prohibited."
- Knowledgebase の該当記事 http://kb.nanda.org/article/AA-00420/... は DNS 解決不可で **取得失敗**．

**判定：1（ソフトウェア・EHR・意思決定支援への搭載は書面ライセンスが必要．診断ラベルも含むと明記）**．Open RN が CC BY で掲載している NANDA-I ラベル表も，Open RN 側は出典引用として載せているだけで INKA の許諾を再配布する形にはなっていない．デモ用でも NANDA-I のラベル文言（「皮膚統合性障害リスク状態」等の定訳）をそのまま製品に載せるのは避け，自前の問題記述（「褥瘡発生のリスクが高い状態」等）にする．

---

## 8. 総括

### 8.1 そのまま使える素材（判定 5）

| 素材 | 条件 |
|---|---|
| Open RN 5 冊（CC BY 4.0）：Nursing Fundamentals 2e，Nursing Skills 2e，Mental Health & Community Concepts 2e，Health Alterations，Management & Professional Concepts 2e | 帰属表示（書名・WisTech Open・CC BY 4.0・URL）．**Braden 表（10.5，fair use）と NANDA-I ラベル表（Appendix A ほか）は除外** |
| 厚労省 診療報酬様式：別紙3 褥瘡対策に関する診療計画書，別紙7 看護必要度評価票，別紙様式7の3 せん妄チェックリスト，医療安全マニュアル「転倒・転落」 | PDL1.0：出典（厚労省 URL）と「加工して作成」の明記 |
| AHRQ Preventing Falls in Hospitals Toolkit（PDF 本体） | パブリックドメイン，出典明記が望ましい．Morse／STRATIFY 等の埋め込みツールは除外 |
| CDC STEADI（ページ本文・PDF） | 出典 "Source: CDC"，非推奨表示の免責，**実質的内容の改変不可**，無償入手可の明記 |
| NIA（ポリシーページ・テキスト） | 出典 "National Institute on Aging, National Institutes of Health"．せん妄の専用ページは無し |
| 4AT（CC BY 4.0，日本語版あり） | 帰属＋改変時は改変の明示と「公式 4AT の妥当性は適用されない」旨 |

### 8.2 非商用・条件付き（判定 3〜4）

| 素材 | 判定 | 条件 |
|---|---|---|
| OpenStax 看護シリーズ（Fundamentals of Nursing，Clinical Nursing Skills，Medical-Surgical Nursing，Pharmacology for Nurses） | 4 | CC BY-NC-SA 4.0．**LLM への投入・学習は OpenStax の許可要**．派生物も同ライセンス |
| CAM-ICU（Vanderbilt） | 4 | 臨床導入は許諾不要だが著作権行 "Copyright © 2002, E. Wesley Ely, MD, MPH and Vanderbilt University, all rights reserved" を必ず表示．製品搭載など他用途は要連絡 |
| Morse Fall Scale | 3 | 無償だが Dr. Janice Morse（janice.morse@nurs.utah.edu）の許諾要．一次ページは現在接続不可（Wayback で確認） |

### 8.3 使わない（判定 1〜2，または取得失敗）

| 素材 | 判定 | 理由 |
|---|---|---|
| NANDA-I／INKA 診断ラベル | 1 | ソフトウェア・EHR・意思決定支援への搭載，AI 学習を明示的に禁止（書面ライセンス要） |
| Braden Scale | 1 | Health Sense Ai の有償ライセンス（病床数課金，3 年契約） |
| Hendrich II | 1 | AHI of Indiana の著作権＋米国特許．公式サイトは取得失敗 |
| CAM（Short／Long／3D，日本語版含む） | 2 | "Not to be reproduced without permission"．HELP 公式サイト（help.agscocare.org）の条件は取得失敗 |
| DST（町田ら） | 2 | 「無断転載を禁じます」「使用許諾 文献参照」 |
| NEECHAM | 2 | © 1985/89 Neelon/Champagne/McConnell，利用条件未確認 |
| OH スケール | 保留（2 扱い） | ライセンス表示の一次情報が見つからず |
| 日本褥瘡学会ガイドライン第 5 版，日本総合病院精神医学会「せん妄の臨床指針」，日本看護協会資料 | 2 | 市販書籍／無断転載禁止．比較・引用の出典としてのみ |
| AHRQ 褥瘡ツールキット PDF，HHS 著作権ページ，AHRQ サイト著作権ページ，STEADI PDF 本体 | 取得失敗 | 各 URL は本文に記載．必要なら手動ブラウザで再確認 |

### 8.4 テーマ別の土台

**褥瘡**
- 土台：Open RN Nursing Fundamentals 2e Chapter 10（10.2 Basic Concepts，10.4 Pressure Injuries，10.6 Applying the Nursing Process：アセスメント項目・介入・評価）＋ Nursing Skills 2e Chapter 14 Integumentary Assessment／Chapter 20 Wound Care．
- 日本側の枠組み：厚労省 別紙3「褥瘡対策に関する診療計画書」の危険因子（日常生活自立度，基本的動作能力，病的骨突出，関節拘縮，栄養状態低下，皮膚湿潤，浮腫）と看護計画欄をそのまま項目化できる（PDL1.0）．
- 使わないもの：Braden の 6 項目×4 段階の表（Open RN 10.5 は fair use．自作リストは「厚労省様式の危険因子」で代替），OH スケールの点数表（許諾不明）．

**転倒**
- 土台：Open RN Nursing Fundamentals 2e 5.6 Preventing Falls（＋5.7 Restraints，5.8，5.9）＋ AHRQ Preventing Falls in Hospitals Toolkit（PDF 本体の risk factor assessment・care planning の記述）＋ CDC STEADI（algorithm，TUG／30-Second Chair Stand／4-Stage Balance の手順）．
- 日本側：厚労省 医療安全マニュアル「転倒・転落」の要点（既往・ADL，物品・設備点検，危険因子）．
- 使わないもの：Morse（許諾要），Hendrich II（特許・ライセンス），STRATIFY（Cambridge の許諾で AHRQ に転載されたもの）．

**せん妄**
- 土台：Open RN Nursing Fundamentals 2e 6.2 Basic Concepts（delirium／dementia／depression の鑑別，原因・症状）と 6.4 Applying the Nursing Process＋ Mental Health and Community Concepts 2e（Chapter 4 Application of the Nursing Process 等）．
- 日本側：厚労省 別紙様式7の3「せん妄ハイリスク患者ケア加算に係るチェックリスト」のリスク因子 7 項目と対策項目（PDL1.0）．
- スクリーニング：無償で載せられるのは **4AT（CC BY 4.0，日本語版あり）**と **CAM-ICU（著作権表示付きで臨床導入可）**のみ．CAM・DST・NEECHAM は不可．

**循環器疾患の観察項目**
- 土台：Open RN Health Alterations Chapter 5 Cardiovascular Alterations（5.3 General Cardiovascular System Assessment，5.5 Hypertension，5.7 CAD，5.8 Heart Failure，5.9 PAD，5.11 DVT）＋ Nursing Skills 2e Chapter 9 Cardiovascular Assessment（9.3 手技，9.4 記録例，9.5 チェックリスト）．いずれも CC BY 4.0．OpenStax Medical-Surgical Nursing は NC-SA＋LLM 制限のため使わない．
