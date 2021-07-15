'use strict';

import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { getMainViewToggleShortcut } from '../components/globalShortcuts/GlobalShortcut';
import {
  getAliasDataOnMemory,
  execCommand,
  saveAliasData,
} from '../components/alias/alias';
import { execFailedDialog } from '../components/dialog/dialog';

ipcMain.handle('message', (event: IpcMainInvokeEvent, message) => {
  return message + 'add';
});

ipcMain.handle('getMainViewToggleShortcut', async () => {
  return await getMainViewToggleShortcut();
});

ipcMain.handle('getAliasData', async () => {
  const aliasData = getAliasDataOnMemory();
  return aliasData;
});

ipcMain.handle(
  'saveAliasData',
  async (event: IpcMainInvokeEvent, aliasData: AliasData): Promise<boolean> => {
    return await saveAliasData(aliasData);
  }
);

ipcMain.handle(
  'execAlias',
  async (event: IpcMainInvokeEvent, command: string) => {
    const result = await execCommand(command);
    if (!result) execFailedDialog();
    return result;
  }
);
