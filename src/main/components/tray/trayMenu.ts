import { app } from 'electron';

import { mainViewToggle, settingWindowToggle } from '../windows/WindowsEvents';

const trayMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'alias-agent',
    click: mainViewToggle,
  },
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
