import { mainWindow, settingWindow, renderSettingWindow } from './Windows';

const mainWindowsEvents = () => {
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
  !settingWindow || settingWindow.isDestroyed()
    ? renderSettingWindow()
    : settingWindow.destroy();
};

export { mainWindowsEvents, mainViewToggle, settingWindowToggle };
