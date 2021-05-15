'use strict';

import path from 'path';
import url from 'url';
import { BrowserWindow, screen } from 'electron';

import { bootReactDevtools } from '../devtools/ReactDevtools';
import { mainWindowsEvents } from './WindowsEvents';
import { isDev, mainViewPort, settingViewPort } from '../../../lib/Const';

let mainWindow: BrowserWindow;
let settingWindow: BrowserWindow;

const _createMainWindow = async () => {
  const display = screen.getPrimaryDisplay();

  const defaultWindowWidth = display.bounds.width / 5;
  const defaultWindowHeight = 420;
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
    transparent: true,
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
  settingWindow.show();
};

const _bootReactDev = async () => {
  // 開発時には React Developer Tools をロードする
  await bootReactDevtools();

  mainWindow.webContents.on('did-frame-finish-load', async () => {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });
};

const _loadMainWindowRendererProcess = async () => {
  // レンダラープロセスをロード
  if (isDev) {
    await mainWindow.loadURL(`http://localhost:${mainViewPort}`);
  } else {
    await mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/mainView/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

const _loadSettingWindowRendererProcess = async () => {
  // レンダラープロセスをロード
  if (isDev) {
    await settingWindow.loadURL(`http://localhost:${settingViewPort}`);
  } else {
    await settingWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/settingView/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

//BrowserWindowインスタンスを作成する関数
const bootWindow = async () => {
  await _createMainWindow();
  mainWindowsEvents();

  // 開発時にはデベロッパーツールを開く
  if (isDev) await _bootReactDev();

  await _loadMainWindowRendererProcess();
};

const renderSettingWindow = async () => {
  await _createSettingWindow();

  // 開発時にはデベロッパーツールを開く
  if (isDev) {
    settingWindow.webContents.on('did-frame-finish-load', async () => {
      settingWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }

  await _loadSettingWindowRendererProcess();
};

const _destroyMainWindow = () => {
  if (!mainWindow.isDestroyed) return mainWindow.destroy();
};

const _destroySettingWindow = () => {
  if (!!settingWindow && !settingWindow.isDestroyed)
    return settingWindow.destroy();
};

const destroyAllWindow = () => {
  _destroyMainWindow();
  _destroySettingWindow();
};

export {
  mainWindow,
  settingWindow,
  bootWindow,
  renderSettingWindow,
  destroyAllWindow,
};
