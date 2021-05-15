'use strict';

import { ipcMain } from 'electron';
import { getMainViewToggleShortcut } from '../components/globalShortcuts/GlobalShortcut';
import { execCommand } from '../components/alias/alias';
import { execFailedDialog } from '../components/dialog/dialog';

ipcMain.handle('message', (event, message) => {
  return message + 'add';
});

ipcMain.handle('getMainViewToggleShortcut', async (event) => {
  return await getMainViewToggleShortcut();
});

ipcMain.handle('execAlias', async (event, command) => {
  const result = await execCommand(command);
  if (!result) execFailedDialog();
  return result;
});
