export default interface IpcApi {
  handleMessage: (message: string) => Promise<null | string>;
  handleInitInputValue: (callback: Function) => void;
  handleGetMainViewToggleShortcut: () => string;
  handleGetGlobalShortcutStatus: () => Promise<GlobalShortCutRegisterIndex>;
  handleSetMainViewToggleShortcut: (
    keys: HotKeys
  ) => Promise<GlobalShortCutRegisterIndex>;
  handleGetAliasData: () => Promise<AliasData>;
  handleSaveAliasData: (aliasData: AliasData) => Promise<boolean>;
  handleExecAlias: (command: string) => Promise<null | boolean>;
}
declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}
