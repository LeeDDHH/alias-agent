'use strict';

/*
import os from 'os';
import fs from 'fs';
import path from 'path';
 */
import { app } from 'electron';
import { bootReactDevtools } from './lib/ReactDevtools';
import './ipc/ipcActions';
import { mainWindow, createWindow } from './lib/Windows';

/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）をロードする
 */
app.whenReady().then(() => {
  // 開発時には React Developer Tools をロードする
  if (process.env.NODE_ENV === 'development') bootReactDevtools();

  // BrowserWindow インスタンスを作成
  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());
