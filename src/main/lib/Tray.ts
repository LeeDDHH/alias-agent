import path from 'path';
import { Tray, Menu, app } from 'electron';

let tray = null;

const createTray = () => {
  const image = path.join(app.getAppPath(), 'src/images/terminal16x16.png');
  tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
};

export { tray, createTray };
