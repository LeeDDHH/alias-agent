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
  handleGetMainViewToggleShortcut: async () => {
    return await ipcRenderer.invoke('getMainViewToggleShortcut');
  },
  handleGetGlobalShortcutStatus: async () => {
    return await ipcRenderer.invoke('getGlobalShortcutStatus');
  },
  handleSetMainViewToggleShortcut: async (keys: HotKeys) => {
    return await ipcRenderer.invoke('setMainViewToggleShortcut', keys);
  },
  handleGetAliasData: async () => {
    return await ipcRenderer.invoke('getAliasData');
  },
  handleSaveAliasData: async (aliasData: AliasData): Promise<boolean> => {
    return await ipcRenderer.invoke('saveAliasData', aliasData);
  },
  handleExecAlias: async (command: string) => {
    return await ipcRenderer.invoke('execAlias', command);
  },
});
