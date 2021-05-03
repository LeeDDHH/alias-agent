import { app } from 'electron';

import { settingWindowToggle } from '../windows/WindowsEvents';

const trayMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: '設定',
    click: settingWindowToggle,
  },
  { type: 'separator' },
  {
    label: '修了',
    click: app.quit,
  },
];

export { trayMenu };
