## プロジェクトに必要なライブラリをインストールする

```
(ElectronとTypeSciprt関連)
yarn -D add electron typescript ts-node @types/node

(React)
yarn add react react-dom
(React型定義)
yarn -D add @types/react @types/react-dom

(ESLint と Prettier)
yarn -D add eslint prettier eslint-config-prettier
(TypeScript用ESLint)
yarn -D add @typescript-eslint/parser @typescript-eslint/eslint-plugin
(React関連プラグイン)
yarn -D add eslint-plugin-react eslint-plugin-react-hooks

(Webpack)
yarn -D add webpack webpack-cli webpack-dev-server @types/webpack-dev-server
(Webpackローダー)
yarn -D add ts-loader css-loader
(プラグインとその型定義ファイル)
yarn -D add mini-css-extract-plugin copy-webpack-plugin @types/mini-css-extract-plugin @types/copy-webpack-plugin
(バンドルされたJavaScriptファイルをHTMLの<script>タグに差し込むためのプラグイン)
yarn -D add html-webpack-plugin @types/html-webpack-plugin

(CSSリセッター)
yarn add reseter.css

(CSSモジュールのTypeScript定義ファイル生成)
yarn add -D typed-css-modules

(Electron devtools関連)
yarn -D add electron-devtools-installer

(ユーティリティ)
yarn -D add rimraf cross-env npm-run-all
```

## TypeScript に書いた CSS Module がバンドルされたら読み込めなかった

- `typescript-plugin-css-modules` パッケージを導入して試す
  - `tsconfig.json` に以下を記載する
    - ```json
      ︙
      "compilerOptions": {
        ︙
        "plugins": [{ "name": "typescript-plugin-css-modules" }]
        ︙
      }
      ︙
      ```
  - `src/@types` に `css.d.ts` を追加する
    - ```typescript
      declare module '*.module.css' {
        const classes: { [key: string]: string };
        export default classes;
      }
      ```
- 最終的には、以下の構成で読み込みができた
  - CSS Module のファイル名を `ファイル名.module.css` にしてからインポートする
  - `typed-css-modules` をグローバルインストールし、css ファイルと同階層に Definitly Typed ファイルを生成する
    - `yarn global add typed-css-modules`
    - `tcm "cssが格納されているディレクトリ"`
- 参考ページ
  - [reactjs - Create-react-app + TypeScript + CSS Modules: Auto-generating type definitions without ejecting from CRA - Stack Overflow](https://stackoverflow.com/questions/58380082/create-react-app-typescript-css-modules-auto-generating-type-definitions-wi)
  - [mrmckeb/typescript-plugin-css-modules: A TypeScript language service plugin providing support for CSS Modules.](https://github.com/mrmckeb/typescript-plugin-css-modules)
  - [TypeScript + React JSX + CSS Modules で実現するタイプセーフな Web 開発 - Qiita](https://qiita.com/Quramy/items/a5d8967cdbd1b8575130)

## Tray のアイコンをパス指定で読み込む

- `import` で画像を読み込み、`nativeImage.createFromPath` とか `nativeImage.createFromDataURL` とかで画像を指定しようとしたら、空の画像で表示された
  - `console.log` で読み込み時の状況を確認しようとしたが、どうやら[NativeImage のインスタンスを console.log で出力すると、空のオブジェクトに表示される](https://stackoverflow.com/questions/57303551/electron-returns-empty-nativeimage-when-im-trying-to-read-image-from-clipboard)らしく、 `console` だとあまり参考にならなかった
- `import` で読み込んだ画像を `nativeImage` でインスタンス化して空だったら、イメージを直接パス指定した画像を読み込むようにしたら、Tray に画像が表示された
  - ただ、このやり方だとバンドル時に画像を `dist` 配下に置くためのだけに `import` 文で読み込ませる必要があったため、いい方法ではなかった
- `webpack` でバンドル時に `copy-webpack-plugin` を使って、必要なソースごと `dist` 配下にコピーすることで、直接パスを指定しながら必要なソースも参照できるようにした
  - [書いたソースコードの例](https://github.com/LeeDDHH/alias-agent/commit/51a34deb6c51cd03ad8a00aa68af1babddf0035a)
  - [コピーにひらめいた記事](https://dev.to/franamorim/tutorial-alarm-widget-with-electron-react-2-34dd)

## React 関連の devtools 読み込みにエラーが起きたときの対処

- BrowserWindow を生成する前に、DevTool を開くようにすると、いかのようなエラーが出る
  - `"Extension server error: Operation failed: Permission denied", source: devtools://devtools/bundled/extensions/extensions.js`
- `webcontent.on` の `did-frame-finish-load` で表示する画面のロードが終わったら `devtool` を開くようにする
  - [javascript - ElectronJS & React DevTools: "Extension server error: Operation failed: http://localhost:3000/ has no execution context", source: devtools:// - Stack Overflow](https://stackoverflow.com/questions/61883609/electronjs-react-devtools-extension-server-error-operation-failed-http-l)
  - [Electron React DevTools 사용 시 Extension server error: Operation failed: Permission denied 에러](https://solo5star.tistory.com/6)
- react 関連の devtools がインストールされていないときのために `electron-devtools-installer` を使って、インストールさせる方法もあった
  - [MarshallOfSound/electron-devtools-installer: An easy way to ensure Chrome DevTools extensions into Electron](https://github.com/MarshallOfSound/electron-devtools-installer#readme)

## React 側の修正に対して、ホットリロードが使えるようにする

- React 側（renderer）のバンドルと `webpack-dev-server` の起動を別処理としてまとめてやる方法がよく紹介されていた
  - [TypeScript の React-Webpack DevServer 実行 - まさたか日記](https://mk.hatenablog.com/entry/2017/09/06/053411)
  - [How to develop apps in Electron using React | WillowTree](https://willowtreeapps.com/ideas/how-to-develop-apps-in-electron-using-react)
- 中でも一番しっくりきたのが以下の方法だった
  - [Start a new Electron app with React and Typescript. - DEV Community](https://dev.to/elisealcala/start-a-new-electron-app-with-react-and-typescript-5f67)
  - 現在の設定を大きく崩さず、 `renderer` のバンドルだけ別ファイル化すればよかったので、手間は思ってたよりも少なくて済んだ
- 導入時にわかったこと
  - `webpack-cli` が 4 系になってからは、 `devServer` を起動する際に、`webpack-dev-server` を直接打ち込まず、以下のコマンド形式になった
    - `webpack-cli serve --mode development`
    - [【webpack-dev-server】Cannot find module 'webpack-cli/bin/config-yargs'【webpack-cli4 系】 - Qiita](https://qiita.com/whiteraccoon/items/f0675297fce333ac9474)
  - `webpack` の `devServer` を起動するコマンドと、それまでに使っていたビルドコマンドを一つの処理として実行するには順次実行ではだめだった
    - `devServer` 起動で処理の修了コードが返ってくるため、後続の処理として書いたコマンドが動かなかった
    - 複数のコマンドの連続した実行と並列した実行のコマンドが用意されている `npm-run-all` に `run-p` という並列実行処理を使って解決した
    - [npm run のスクリプトを連続実行・並列実行する (npm-run-all) | まくまく Node.js ノート](https://maku77.github.io/nodejs/npm/npm-run-all.html)
    - [4 Solutions To Run Multiple Node.js or NPM Commands Simultaneously | by Paige Niedringhaus | ITNEXT](https://itnext.io/4-solutions-to-run-multiple-node-js-or-npm-commands-simultaneously-9edaa6215a93)
- electron 側でホットリロードをかける方法もあった
  - [How to set up hot reload on Electron](https://flaviocopes.com/electron-hot-reload/)
  - [Electron でホットリロード開発をしたい！ - Qiita](https://qiita.com/ganariya/items/982803466e22dc53eaeb)
  - [sindresorhus/electron-reloader: Simple auto-reloading for Electron apps during development](https://github.com/sindresorhus/electron-reloader#readme)
  - [create-react-app と electron-builder で TypeScript と Hot Reload に完全対応した Electron アプリ開発環境を作成する - Qiita](https://qiita.com/yhirose/items/22b0621f0d36d983d8b0)
