'use strict';

import path from 'path';
import url from 'url';
import { app, BrowserWindow, screen } from 'electron';

import { bootReactDevtools } from '../devtools/ReactDevtools';
import { mainWindowsEvents } from './WindowsEvents';
import { mainViewPort, settingViewPort, systemAccentColor } from '@/lib/Const';
import { isDev } from '@/lib/Compile';

let mainWindow: BrowserWindow;
let settingWindow: BrowserWindow;

const _createMainWindow = async (): Promise<void> => {
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

const _createSettingWindow = async (): Promise<void> => {
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

  settingWindow.on('focus', () => {
    settingWindow.webContents.send('sendSystemAccentColor', systemAccentColor);
  });
};

const _bootReactDev = async (): Promise<void> => {
  // 開発時には React Developer Tools をロードする
  await bootReactDevtools();

  mainWindow.webContents.on('did-frame-finish-load', async () => {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });
};

const _loadMainWindowRendererProcess = async (): Promise<void> => {
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

const _loadSettingWindowRendererProcess = async (): Promise<void> => {
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
const bootWindow = async (): Promise<void> => {
  await _createMainWindow();
  mainWindowsEvents();

  // 開発時にはデベロッパーツールを開く
  if (isDev) await _bootReactDev();

  await _loadMainWindowRendererProcess();
};

const renderSettingWindow = async (): Promise<void> => {
  await _createSettingWindow();

  // 開発時にはデベロッパーツールを開く
  if (isDev) {
    settingWindow.webContents.on('did-frame-finish-load', async () => {
      settingWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }

  await _loadSettingWindowRendererProcess();
  // 設定画面表示時にはdockを表示する
  app.dock.show();
};

const closeSettingWindow = (): void => {
  // 設定画面を閉じたらdockを非表示する
  app.dock.hide();
  settingWindow.close();
};

const _closeMainWindow = (): void => {
  if (!mainWindow.isDestroyed) return mainWindow.close();
};

const _closeSettingWindow = (): void => {
  if (!!settingWindow && !settingWindow.isDestroyed)
    return settingWindow.close();
};

const closeAllWindow = (): void => {
  _closeMainWindow();
  _closeSettingWindow();
};

const _destroyMainWindow = (): void => {
  if (!mainWindow.isDestroyed) return mainWindow.destroy();
};

const _destroySettingWindow = (): void => {
  if (!!settingWindow && !settingWindow.isDestroyed)
    return settingWindow.destroy();
};

const destroyAllWindow = (): void => {
  _destroyMainWindow();
  _destroySettingWindow();
};

export {
  mainWindow,
  settingWindow,
  bootWindow,
  renderSettingWindow,
  closeSettingWindow,
  closeAllWindow,
  destroyAllWindow,
};
