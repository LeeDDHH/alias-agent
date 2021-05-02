'use strict';

import { ipcMain } from 'electron';

ipcMain.handle('message', (event, message) => {
  return message + 'add';
});
