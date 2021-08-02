'use strict';

/*
import os from 'os';
import fs from 'fs';
import path from 'path';
 */
import { app } from 'electron';
import {
  closeAllWindow,
  destroyAllWindow,
  bootWindow,
} from './components/windows/Windows';
import { createTray } from './components/tray/Tray';
import './ipc/ipcMainActions';
import { prepareApp } from './components/prepareApp/prepareApp';
import { unSetAllGlobalShortcut } from './components/globalShortcuts/GlobalShortcut';

// 起動中、メニューバーだけに表示させる
app.dock.hide();

/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）をロードする
 */
app.whenReady().then(async () => {
  await prepareApp();
  // BrowserWindow インスタンスを作成
  await bootWindow();
  createTray();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', async () => {
  await unSetAllGlobalShortcut();
  app.quit();
});

app.on('before-quit', () => closeAllWindow());

app.on('quit', () => destroyAllWindow());
