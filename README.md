# Electron + React + TypeScript アプリ

[Electron + TypeScript + React の環境構築(Early 2021）](https://qiita.com/sprout2000/items/9c91362e7d7b7c2c6d22)を元に作成

## 動作環境

|         |         |
| ------- | ------- |
| node.js | 14.15.4 |
| npm     | 7.5.4   |
| yarn    | 1.22.4  |

## 実行コマンド

### install

nodebrew での方法を記載

```zsh
nodebrew install-binary 14.16.1
nodebrew use 14.16.1
```

[TypeScript + React JSX + CSS Modules で実現するタイプセーフな Web 開発](https://qiita.com/Quramy/items/a5d8967cdbd1b8575130)

## 構造

```
.
├── README.md
├── dist
│   └── main
│       ├── images
│       │   ├── img.d.ts
│       │   └── terminal16x16.png
│       ├── main.js
│       └── preload.js
├── package.json
├── src
│   ├── @types
│   │   └── global.d.ts
│   ├── images
│   │   ├── img.d.ts
│   │   └── terminal16x16.png
│   ├── main
│   │   ├── ipc
│   │   │   └── ipcMainActions.ts
│   │   ├── lib
│   │   │   ├── Const.ts
│   │   │   ├── ReactDevtools.ts
│   │   │   ├── Tray.ts
│   │   │   └── Windows.ts
│   │   ├── main.ts
│   │   └── preload.ts
│   └── renderer
│       └── mainView
│           ├── components
│           │   └── mainView.tsx
│           ├── index.html
│           ├── renderer.tsx
│           └── styles
│               ├── app.module.css
│               ├── app.module.css.d.ts
│               ├── mainView.module.css
│               └── mainView.module.css.d.ts
├── tsconfig.json
├── webpack.config.ts
└── yarn.lock
```
