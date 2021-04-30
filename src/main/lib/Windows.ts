'use strict';

import path from 'path';
import url from 'url';
import { BrowserWindow, screen } from 'electron';

import { bootReactDevtools } from './ReactDevtools';

let mainWindow: BrowserWindow;

//BrowserWindowインスタンスを作成する関数
const createWindow = async () => {
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
    // 開発時には React Developer Tools をロードする
    bootReactDevtools();

    mainWindow.webContents.on('did-frame-finish-load', async () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }

  // レンダラープロセスをロード
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/mainView/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

export { mainWindow, createWindow };
