import { mainWindow, settingWindow } from './Windows';

const _mainWindowsEvents = () => {
  mainWindow.on('blur', () => mainWindow.hide());
};

const mainViewToggle = () => {
  if (mainWindow.isFocused()) {
    mainWindow.webContents.send('initInputValue');
    return mainWindow.hide();
  }
  mainWindow.show();
};

const settingWindowToggle = () => {
  settingWindow.isFocused() ? settingWindow.hide() : settingWindow.show();
};

export { _mainWindowsEvents, mainViewToggle, settingWindowToggle };
