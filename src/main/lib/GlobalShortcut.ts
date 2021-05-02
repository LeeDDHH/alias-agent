import { app, globalShortcut } from 'electron';
import { mainViewToggle } from './Windows';

app.whenReady().then(() => {
  const ret = globalShortcut.register('Control+Space', () => {
    mainViewToggle();
  });

  if (!ret) console.log('registration failed');

  console.log(globalShortcut.isRegistered('Control+Space'));
});

app.on('will-quit', () => {
  globalShortcut.unregister('Control+Space');
  globalShortcut.unregisterAll();
});
