import { mainWindow, settingWindow, renderSettingWindow } from './Windows';
import { isDev } from '../../../lib/Const';

const mainWindowsEvents = () => {
  mainWindow.on('blur', () => {
    if (!isDev) mainWindow.hide();
    mainWindow.webContents.send('initInputValue');
  });
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
