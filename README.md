# Electron + React + TypeScript アプリ

[Electron + TypeScript + React の環境構築(Early 2021）](https://qiita.com/sprout2000/items/9c91362e7d7b7c2c6d22)を元に作成

## 動作環境

|         |         |
| ------- | ------- |
| node.js | 12.21.0 |
| npm     | 6.14.11 |
| yarn    | 1.22.4  |

## 実行コマンド

### install

nodebrew での方法を記載

```zsh
nodebrew install-binary 12.21.0
nodebrew use 12.21.0

(CSS ModuleのDefinitly Typedファイル生成のためのコマンドをグローバルインストールする)
yarn global add typed-css-modules
```

[TypeScript + React JSX + CSS Modules で実現するタイプセーフな Web 開発](https://qiita.com/Quramy/items/a5d8967cdbd1b8575130)
