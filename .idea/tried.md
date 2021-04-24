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
yarn -D add webpack webpack-cli
(Webpackローダー)
yarn -D add ts-loader css-loader
(プラグインとその型定義ファイル)
yarn -D add mini-css-extract-plugin @types/mini-css-extract-plugin
(バンドルされたJavaScriptファイルをHTMLの<script>タグに差し込むためのプラグイン)
yarn -D add html-webpack-plugin

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
  - CSS Moduleのファイル名を `ファイル名.module.css` にしてからインポートする
  - `typed-css-modules` をグローバルインストールし、cssファイルと同階層にDefinitly Typedファイルを生成する
    - `yarn global add typed-css-modules`
    - `tcm "cssが格納されているディレクトリ"`
- 参考ページ
  - [reactjs - Create-react-app + TypeScript + CSS Modules: Auto-generating type definitions without ejecting from CRA - Stack Overflow](https://stackoverflow.com/questions/58380082/create-react-app-typescript-css-modules-auto-generating-type-definitions-wi)
  - [mrmckeb/typescript-plugin-css-modules: A TypeScript language service plugin providing support for CSS Modules.](https://github.com/mrmckeb/typescript-plugin-css-modules)
  - [TypeScript + React JSX + CSS Modules で実現するタイプセーフなWeb開発 - Qiita](https://qiita.com/Quramy/items/a5d8967cdbd1b8575130)
