'use strict';

import { ipcMain } from 'electron';
import { getMainViewToggleShortcut } from '../components/globalShortcuts/GlobalShortcut';

ipcMain.handle('message', (event, message) => {
  return message + 'add';
});

ipcMain.handle('getMainViewToggleShortcut', async (event) => {
  return await getMainViewToggleShortcut();
});
