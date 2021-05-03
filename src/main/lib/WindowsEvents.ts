import { mainWindow } from './Windows';

const _mainWindowsEvents = () => {
  mainWindow.on('blur', () => mainWindow.hide());
};

export { _mainWindowsEvents };
