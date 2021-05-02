'use strict';

/*
import os from 'os';
import fs from 'fs';
import path from 'path';
 */
import { app } from 'electron';
import { destroyWindow, createWindow } from './lib/Windows';
import { tray, createTray } from './lib/Tray';
import './ipc/ipcMainActions';
import './lib/GlobalShortcut';

/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）をロードする
 */
app.whenReady().then(() => {
  // BrowserWindow インスタンスを作成
  createWindow();
  createTray();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());

app.on('before-quit', () => destroyWindow());

app.on('quit', () => destroyWindow());
