import path from 'path';
import { Tray, Menu, app } from 'electron';

import { trayMenu } from './trayMenu';
import { trayImage } from '../../../lib/Const';

let tray = null;

const createTray = () => {
  const image = path.join(app.getAppPath(), trayImage);
  tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  tray.setToolTip('Alias Agent');
  tray.setContextMenu(contextMenu);
};

export { tray, createTray };
