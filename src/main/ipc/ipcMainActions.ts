'use strict';

import { ipcMain, IpcMainInvokeEvent } from 'electron';
import {
  updateGlobalShortCut,
  getCurrentGlobalShortcutStatus,
  getCurrentGlobalShortcut,
} from '../components/globalShortcuts/GlobalShortcut';
import {
  getAliasDataOnMemory,
  execCommand,
  saveAliasData,
} from '../components/alias/alias';
import { execFailedDialog } from '../components/dialog/dialog';

ipcMain.handle('message', (event: IpcMainInvokeEvent, message) => {
  return message + 'add';
});

ipcMain.handle('getMainViewToggleShortcut', () => {
  return getCurrentGlobalShortcut();
});

ipcMain.handle('getGlobalShortcutStatus', () => {
  return getCurrentGlobalShortcutStatus();
});

ipcMain.handle(
  'setMainViewToggleShortcut',
  async (evetn: IpcMainInvokeEvent, keys: HotKeys) => {
    return await updateGlobalShortCut(keys);
  }
);

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
