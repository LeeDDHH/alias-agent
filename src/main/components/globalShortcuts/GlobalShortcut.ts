import { app, globalShortcut } from 'electron';
import { mainViewToggle } from '../windows/WindowsEvents';
import { defaultMainViewToggleShortcut } from '../../../lib/Const';

app.whenReady().then(() => {
  const ret = globalShortcut.register(defaultMainViewToggleShortcut, () => {
    mainViewToggle();
  });

  if (!ret) console.log('registration failed');

  console.log(globalShortcut.isRegistered(defaultMainViewToggleShortcut));
});

app.on('will-quit', () => {
  globalShortcut.unregister(defaultMainViewToggleShortcut);
  globalShortcut.unregisterAll();
});
