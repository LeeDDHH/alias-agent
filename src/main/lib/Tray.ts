import path from 'path';
import { Tray, Menu, app } from 'electron';

import { trayMenu } from '../data/trayMenu';

let tray = null;

const createTray = () => {
  const image = path.join(app.getAppPath(), 'src/images/terminal16x16.png');
  tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
};

export { tray, createTray };
