import path from 'path';
import { app } from 'electron';
import { globalShortcut } from 'electron';
import { mainViewToggle } from '../windows/WindowsEvents';
import { isExistFile, readJsonFile } from '../../../lib/Utility';
import {
  globalSettingJsonName,
  defaultMainViewToggleShortcut,
} from '../../../lib/Const';

const getGlobalSettingsFilePath = path.join(
  app.getPath('userData'),
  globalSettingJsonName
);

const getMainViewToggleShortcut = async () => {
  let mainViewToggleShortcut = defaultMainViewToggleShortcut;

  if (isExistFile(getGlobalSettingsFilePath)) {
    let data;
    try {
      data = await readJsonFile(getGlobalSettingsFilePath);
      mainViewToggleShortcut = data.globalShortcut;
    } catch (e) {
      console.log('globalSettingsFile read failed: ' + e);
    }
  }

  return mainViewToggleShortcut;
};

const setAllGlobalShortcut = async () => {
  let mainViewToggleShortcut = await getMainViewToggleShortcut();

  try {
    globalShortcut.register(mainViewToggleShortcut, () => {
      mainViewToggle();
    });
  } catch (e) {
    console.log('globalShortcut register failed: ' + e);
  }

  console.log(globalShortcut.isRegistered(defaultMainViewToggleShortcut));
};

const unSetAllGlobalShortcut = async () => {
  let mainViewToggleShortcut = await getMainViewToggleShortcut();
  globalShortcut.unregister(mainViewToggleShortcut);
  globalShortcut.unregisterAll();
};

export {
  getMainViewToggleShortcut,
  setAllGlobalShortcut,
  unSetAllGlobalShortcut,
};
