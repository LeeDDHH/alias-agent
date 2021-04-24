'use strict';

/*
import os from 'os';
import fs from 'fs';
 */
import path from 'path';
import { app, session } from 'electron';
import { searchReactDevtools } from './lib/ReactDevtools';
import './ipc/ipcActions';
import { mainWindow, createWindow } from './lib/Windows';

/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）を
 * ロードする
 */
app.whenReady().then(async () => {
  /**
   * 開発時には React Developer Tools をロードする
   */
  if (process.env.NODE_ENV === 'development') {
    const extPath = await searchReactDevtools();
    if (extPath) {
      await session.defaultSession
        .loadExtension(extPath, {
          allowFileAccess: true,
        })
        .then(() => console.log('React Devtools loaded...'))
        .catch((err) => console.log(err));
    }
  }

  // BrowserWindow インスタンスを作成
  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());
