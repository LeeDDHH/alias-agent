import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcApi', {
  handleMessage: async (message: string) => {
    return await ipcRenderer.invoke('message', message);
  },
  handleInitInputValue: (callback: Function) => {
    return ipcRenderer.on('initInputValue', (e) => {
      callback();
    });
  },
  handleGetMainViewToggleShortcut: () => {
    return ipcRenderer.invoke('getMainViewToggleShortcut');
  },
});
