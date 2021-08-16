import {
  mainWindow,
  settingWindow,
  renderSettingWindow,
  closeSettingWindow,
} from './Windows';
import { isDev } from '../../../lib/Const';

const mainWindowsEvents = (): void => {
  mainWindow.on('blur', () => {
    if (!isDev) mainWindow.hide();
    mainWindow.webContents.send('initInputValue');
  });
};

const mainViewToggle = (): void => {
  if (mainWindow.isFocused()) {
    mainWindow.webContents.send('initInputValue');
    return mainWindow.hide();
  }
  mainWindow.show();
};

const settingWindowToggle = (): void => {
  !settingWindow || settingWindow.isDestroyed()
    ? renderSettingWindow()
    : closeSettingWindow();
};

export { mainWindowsEvents, mainViewToggle, settingWindowToggle };
