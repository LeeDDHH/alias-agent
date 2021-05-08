'use strict';

/*
import os from 'os';
import fs from 'fs';
import path from 'path';
 */
import { app } from 'electron';
import { destroyWindow, createWindow } from './components/windows/Windows';
import { tray, createTray } from './components/tray/Tray';
import './ipc/ipcMainActions';
import { prepareApp } from './components/prepareApp/prepareApp';
import { unSetAllGlobalShortcut } from './components/globalShortcuts/GlobalShortcut';

app.dock.hide();
/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）をロードする
 */
app.whenReady().then(async () => {
  await prepareApp();
  // BrowserWindow インスタンスを作成
  await createWindow();
  createTray();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', async () => {
  await unSetAllGlobalShortcut();
  app.quit();
});

app.on('before-quit', () => destroyWindow());

app.on('quit', () => destroyWindow());
