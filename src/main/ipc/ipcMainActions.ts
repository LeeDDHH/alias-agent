'use strict';

import { ipcMain } from 'electron';
import { getMainViewToggleShortcut } from '../components/globalShortcuts/GlobalShortcut';
import { getAliasDataFromFile, execCommand } from '../components/alias/alias';
import { execFailedDialog } from '../components/dialog/dialog';

ipcMain.handle('message', (event, message) => {
  return message + 'add';
});

ipcMain.handle('getMainViewToggleShortcut', async (event) => {
  return await getMainViewToggleShortcut();
});

ipcMain.handle('getAliasData', async (event) => {
  const aliasData = await getAliasDataFromFile();
  return aliasData.alias;
});

ipcMain.handle('saveAliasData', async (event, aliasData: AliasData) => {
  console.log(aliasData);
  // const result = await saveAliasData(aliasData);
  // const aliasData = await getAliasDataFromFile();
  // return aliasData.alias;
});

ipcMain.handle('execAlias', async (event, command) => {
  const result = await execCommand(command);
  if (!result) execFailedDialog();
  return result;
});
