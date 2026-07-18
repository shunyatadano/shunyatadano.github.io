# shunyatadano.github.io

Shunya Tadano の個人研究者ウェブサイトです。

- 公開URL: <https://shunyatadano.github.io/>
- ホスティング: GitHub Pages
- 公開元: `main` ブランチのリポジトリルート `/`
- 構成: 静的なHTML / CSS / JavaScript（ビルド作業・パッケージ導入不要）
- 主言語: 英語（国内発表は英訳と日本語原題を併記）

## ファイル構成

```text
shunyatadano.github.io/
├── index.html                   # ページ本文、メタデータ、各リンク、SVGアイコン
├── assets/
│   ├── css/
│   │   └── site.css             # レイアウト、色、フォント、レスポンシブ表示
│   ├── js/
│   │   └── site.js              # モバイルメニュー、現在位置表示
│   ├── images/
│   │   └── .gitkeep             # プロフィール・研究画像の格納場所
│   └── files/
│       └── .gitkeep             # CVなどダウンロードファイルの格納場所
├── docs/
│   └── aist-go-jp-k-koide.png   # 制作時の参考画像。サイト本体では未使用
├── .nojekyll                    # Jekyll処理を無効化し、静的ファイルを直接配信
├── .gitignore                   # Gitの追跡対象外ファイル設定
└── README.md                    # この運用手順
```

> [!IMPORTANT]
> このリポジトリは公開リポジトリです。コミットした画像、PDF、文書などは、サイトからリンクしていなくても外部から取得できる可能性があります。秘密情報、個人用トークン、非公開の連絡先、公開したくないPDFは保存しないでください。

## ローカルで確認する

リポジトリ直下で簡易HTTPサーバーを起動します。

```bash
cd /home/shunya/shunyatadano.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

ブラウザで次のURLを開きます。

```text
http://127.0.0.1:8000/
```

終了するときは、サーバーを実行しているターミナルで `Ctrl+C` を押します。

8000番ポートが使用中の場合は、別の番号を指定してください。

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

`index.html` を直接開くこともできますが、GitHub Pagesに近い条件で確認できるHTTPサーバー方式を推奨します。

## 通常の更新手順

### 1. 最新状態を取得する

別のPCやGitHub上で変更している可能性がある場合は、編集前に取得します。

```bash
git pull --ff-only origin main
```

### 2. ファイルを編集する

主な更新先は次の2ファイルです。

- 掲載内容やリンク: `index.html`
- 見た目やレイアウト: `assets/css/site.css`

通常、`assets/js/site.js` を編集する必要はありません。

### 3. ローカルで確認する

上記のHTTPサーバーを起動し、最低限次を確認します。

- PC幅とスマートフォン幅で文字やカードがはみ出していない
- ヘッダーの各リンクが正しいセクションへ移動する
- 外部リンク、メールリンク、PDFリンクが開く
- 日本語と英語の文字化けがない
- ブラウザの開発者ツールにエラーが出ていない

### 4. 変更内容を確認する

```bash
git status
git diff
```

公開してよいファイルだけが変更されていることを確認します。

### 5. コミットして公開する

```bash
git add index.html assets README.md
git commit -m "Update website content"
git push origin main
```

`main` へpushすると、GitHub Pagesのビルドと公開が自動的に始まります。通常は数十秒から数分で反映されます。

公開設定はGitHubの次の場所で確認できます。

```text
Repository → Settings → Pages
Source: Deploy from a branch
Branch: main / (root)
```

## 掲載内容を更新する

すべての本文は `index.html` にあります。セクションは次のIDで分かれています。

| セクション | ID | 主な内容 |
| --- | --- | --- |
| Home | `#home` | 氏名、所属、紹介、連絡・プロフィールリンク、CV |
| Recent News | `#news` | 最新ニュース |
| Research | `#research` | 研究テーマ |
| Publications | `#publications` | 発表・記事一覧 |
| Profile | `#profile` | 学歴・受賞 |
| Contact | `#contact` | メール・SNS・研究者プロフィール |

セクションIDはヘッダーリンクやページ内リンクから参照されています。変更する場合は、`href="#..."` 側も同時に更新してください。

### プロフィール・所属を更新する

`index.html` の `id="home"` 内を編集します。

主な対象:

- `h1`: 英語氏名
- `.hero__name-ja`: 日本語氏名
- `.hero__role`: 所属・職位
- `.hero__intro`: 自己紹介
- `.hero__affiliation`: 所在地・研究室リンク
- `.hero__links`: Email、GitHub、LinkedIn、X、Google Scholar、researchmap、CV

ページ下部の更新年月は、次の表示も手動で更新します。

```html
<span>Updated 07.2026</span>
```

### ニュースを追加する

`id="news"` 内の `.news-list` の先頭に、既存の `.news-item` をコピーして追加します。

```html
<article class="news-item">
  <time datetime="2026-07-18">Jul 2026</time>
  <div>
    <h3>News title.</h3>
    <p>Short description of the update.</p>
  </div>
  <a
    class="arrow-link"
    href="https://example.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Read more about this update"
  >↗</a>
</article>
```

- 新しいニュースを上に配置します。
- `datetime` は `YYYY-MM-DD` または `YYYY-MM` 形式にします。
- 外部ページを新しいタブで開く場合は `rel="noopener noreferrer"` を残します。
- サイト内の発表へ移動する場合は `href="#pub-..."` を使用します。

### 研究テーマを更新する

`id="research"` 内の `.research-card` を編集します。

- `.research-card__index`: `R—01` などの表示番号
- `h3`: 研究テーマ名
- 本文の `p`: 説明
- `Related work`: 関連発表のアンカー

カードを増減する場合は、PC・タブレット・スマートフォンの3幅でレイアウトを確認してください。

### 発表・記事を追加する

`id="publications"` 内は次の3グループに分かれています。

1. `International Presentation`
2. `Domestic Presentations`
3. `Articles & Miscellaneous`

対象グループの `.publication-list` に `.publication` を追加します。

```html
<li class="publication" id="pub-example2026">
  <article>
    <div class="publication__meta">
      <span>2026</span>
      <span>Conference name</span>
    </div>
    <h4>English title</h4>
    <p class="publication__original" lang="ja">日本語原題</p>
    <p><strong>Shunya Tadano</strong>, Coauthor Name</p>
    <p class="publication__venue">Conference or journal information.</p>
    <a
      class="publication__link"
      href="https://doi.org/..."
      target="_blank"
      rel="noopener noreferrer"
    >DOI ↗</a>
  </article>
</li>
```

更新時の注意:

- 本人名は `<strong>` で囲みます。
- DOIや公式ページは、正しいことを確認できた場合だけ掲載します。
- ニュースや研究カードから直接移動させる場合は、重複しない `id="pub-..."` を付けます。
- 各グループ見出しの `01 item`、`06 items` などは自動計算ではないため、件数を手動で直します。
- 発表番号、巻、号、ページ、年も元資料と照合します。

### 学歴・受賞を更新する

`id="profile"` 内を編集します。

- 学歴: `.timeline`
- 受賞: `.award-list`

新しい項目は上に追加し、年の新しい順に並べます。

### SNS・メールを更新する

同じリンクが次の場所にあります。

1. Homeの `.hero__links`
2. Contactの `.contact-links`
3. `<head>` 内のPerson構造化データ `sameAs`

URLを変更するときは3か所を確認してください。メールアドレスは、次の場所にもあります。

- `<meta>` ではなくJSON-LD内の `email`
- Homeの `mailto:`
- Contactの `mailto:` と表示テキスト

SNSアイコンは `index.html` 冒頭の `.icon-sprite` 内で定義しています。既存サービスのリンク変更だけであれば、SVG部分を編集する必要はありません。

## 画像を追加・差し替えする

画像は `assets/images/` に格納します。

推奨形式:

- 写真: WebPまたはJPEG
- 図やロゴ: SVGまたはPNG
- ファイル名: 半角英数字とハイフン（例: `profile.webp`）
- 大きすぎる画像はWeb用に縮小・圧縮する

### プロフィール画像

推奨サイズは正方形、960 × 960 px以上です。

`index.html` の `.profile-visual` プレースホルダー全体を次に置き換えます。

```html
<img
  class="profile-visual profile-visual--image reveal reveal--first"
  src="assets/images/profile.webp"
  alt="Portrait of Shunya Tadano"
  width="960"
  height="960"
>
```

### 研究画像

推奨比率は16:9、1280 × 720 px以上です。

各 `.research-visual` プレースホルダーを次のような画像へ置き換えます。

```html
<img
  class="research-visual research-visual--image"
  src="assets/images/social-navigation.webp"
  alt="Mobile robot navigating around pedestrians"
  width="1280"
  height="720"
  loading="lazy"
>
```

`alt` には「research image」のような曖昧な文ではなく、画像から読み取れる研究内容を簡潔に記述してください。

## CVを公開する

新しいCVを次の場所へ保存します。

```text
assets/files/shunya-tadano-cv.pdf
```

PDFに住所、電話番号、個人メール、文書メタデータなど、公開したくない情報が含まれていないことを確認してください。

`index.html` の `CV — forthcoming` を表示している `<span>` を、次のリンクへ置き換えます。

```html
<a
  class="hero-link"
  href="assets/files/shunya-tadano-cv.pdf"
  download
>
  <svg class="social-icon" aria-hidden="true">
    <use href="#icon-file"></use>
  </svg>
  <span>Download CV</span>
</a>
```

ファイルを更新するときは、同じファイル名で置き換えるとHTMLを変更せずに済みます。ブラウザキャッシュを確実に更新したい場合は、ファイル名に年月を含めてHTML側も変更します。

## デザインを変更する

スタイルは `assets/css/site.css` に集約しています。

冒頭の `:root` にあるCSS変数を変更すると、サイト全体へ反映できます。

```css
:root {
  --paper: #f4f2ec;
  --ink: #18212a;
  --blue: #1e57e7;
  --amber: #f2b544;
  --serif: "Source Serif 4", Georgia, serif;
  --sans: "IBM Plex Sans", "Noto Sans JP", sans-serif;
}
```

フォントは `index.html` のGoogle Fontsリンクでも読み込んでいるため、フォント名を変える場合は両方を更新してください。

レスポンシブ設定は主に次のメディアクエリにあります。

- `max-width: 940px`: タブレット
- `max-width: 760px`: モバイルナビゲーションと1列化
- `max-width: 480px`: 小型スマートフォン
- `prefers-reduced-motion`: アニメーション抑制
- `print`: 印刷用表示

## JavaScriptの役割

`assets/js/site.js` は次だけを担当します。

- モバイルメニューの開閉
- Escapeキーによるメニュー終了
- ナビゲーションの現在位置表示
- スクロール時のヘッダー装飾

本文はJavaScriptで生成していません。JavaScriptが無効でも、本文とリンクは利用できます。

## 公開後に確認する

push後は次を確認します。

1. GitHubの `Settings → Pages` またはActionsでビルドが成功している
2. <https://shunyatadano.github.io/> が開く
3. 更新した文章、画像、リンクが反映されている
4. PCとスマートフォンの両方で表示する
5. 強制再読み込み後も問題がない

強制再読み込み:

- Windows / Linux: `Ctrl+Shift+R`
- macOS: `Command+Shift+R`

## トラブルシューティング

### pushしても変更が見えない

- Pagesのビルド完了まで数分待つ
- ブラウザを強制再読み込みする
- `Settings → Pages` で公開元が `main / (root)` になっているか確認する
- ファイル名の大文字・小文字がHTMLと一致しているか確認する

### 画像やCSSが表示されない

- `/assets/...` ではなく、既存コードと同じ `assets/...` の相対パスを使う
- ファイルがGitへ追加されているか `git status` で確認する
- ローカルでは大文字・小文字の違いが見逃される場合があるため、GitHub上のファイル名も確認する

### ローカルサーバーを起動できない

`Address already in use` と表示された場合は、別ポートを使用します。

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

### 公開内容を元に戻したい

履歴を確認し、対象コミットを打ち消すコミットを作ります。

```bash
git log --oneline
git revert <commit-id>
git push origin main
```

公開済みの履歴を壊さないため、通常は `git reset --hard` や強制pushを使用しないでください。

## 更新前チェックリスト

- [ ] 氏名、所属、年、発表情報が正しい
- [ ] Email・SNS・DOI・公式ページのリンクが開く
- [ ] 掲載する画像・PDFに非公開情報が含まれていない
- [ ] Publicationの表示件数を更新した
- [ ] PC幅とスマートフォン幅で表示確認した
- [ ] `git status` と `git diff` でコミット対象を確認した
- [ ] 公開後にGitHub Pagesのビルド成功と実URLを確認した

