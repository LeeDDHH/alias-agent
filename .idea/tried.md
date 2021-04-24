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
