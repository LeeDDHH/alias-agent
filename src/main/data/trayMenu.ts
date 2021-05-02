import { app } from 'electron';

const trayMenu: Electron.MenuItemConstructorOptions[] = [
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { type: 'separator' },
  {
    label: '修了',
    click: app.quit,
  },
];

export { trayMenu };
