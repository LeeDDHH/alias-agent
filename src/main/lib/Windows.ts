'use strict';

import path from 'path';
import { BrowserWindow, screen } from 'electron';

let mainWindow: BrowserWindow;

//BrowserWindowインスタンスを作成する関数
const createWindow = () => {
  const display = screen.getPrimaryDisplay();

  const defaultWindowWidth = display.bounds.width / 5;
  const defaultWindowHeight = 70;
  const defaultCenterXPositionView =
    display.bounds.width / 2 - defaultWindowWidth / 2;
  const defaultYPositionView = display.bounds.height / 10;
  mainWindow = new BrowserWindow({
    x: defaultCenterXPositionView,
    y: defaultYPositionView,
    width: defaultWindowWidth,
    height: defaultWindowHeight,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      /**
       * BrowserWindowインスタンス（レンダラープロセス）では
       * Node.jsの機能を無効化する（electron@8以降でデフォルト）
       */
      nodeIntegration: false,
      /**
       * メインプロセスとレンダラープロセスとの間で
       * コンテキストを共有しない (electron@11以降でデフォルト)
       */
      contextIsolation: true,
      /**
       * Preloadスクリプト
       * webpack.config.js で 'node.__dirname: false' を
       * 指定していればパスを取得できる
       */
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 開発時にはデベロッパーツールを開く
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html');
};

export { mainWindow, createWindow };
