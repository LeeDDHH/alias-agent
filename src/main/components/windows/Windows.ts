'use strict';

import path from 'path';
import url from 'url';
import { BrowserWindow, screen } from 'electron';

import { bootReactDevtools } from '../devtools/ReactDevtools';
import { _mainWindowsEvents } from './WindowsEvents';
import { isDev } from '../../../lib/Const';

let mainWindow: BrowserWindow;
let settingWindow: BrowserWindow;

const _createMainWindow = async () => {
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
    show: false,
    skipTaskbar: true,
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

  // mainWindow.hide();
  // mainWindow.once('ready-to-show', () => mainWindow.hide());
};

const _createSettingWindow = async () => {
  settingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    fullscreenable: false,
    show: false,
    skipTaskbar: true,
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
  // settingWindow.hide();
};

const _bootReactDev = async () => {
  // 開発時には React Developer Tools をロードする
  await bootReactDevtools();

  mainWindow.webContents.on('did-frame-finish-load', async () => {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    settingWindow.webContents.openDevTools({ mode: 'detach' });
  });
};

const _loadRendererProcess = async () => {
  // レンダラープロセスをロード
  if (isDev) {
    await mainWindow.loadURL(`http://localhost:4000`);
    await settingWindow.loadURL(`http://localhost:4001`);
  } else {
    await mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/mainView/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
    await settingWindow.loadURL(
      url.format({
        pathname: path.join(
          __dirname,
          '../renderer/settingViewView/index.html'
        ),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

//BrowserWindowインスタンスを作成する関数
const createWindow = async () => {
  await _createMainWindow();
  await _createSettingWindow();
  _mainWindowsEvents();

  // 開発時にはデベロッパーツールを開く
  if (isDev) await _bootReactDev();

  await _loadRendererProcess();
};

const destroyWindow = () => {
  if (!mainWindow.isDestroyed) return mainWindow.destroy();
};

export { mainWindow, settingWindow, createWindow, destroyWindow };
