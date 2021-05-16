export default interface IpcApi {
  handleMessage: (message: string) => Promise<null | string>;
  handleInitInputValue: (callback: Function) => void;
  handleGetMainViewToggleShortcut: () => Promise<string>;
  handleGetAliasData: () => Promise<AliasData>;
  handleSaveAliasData: (aliasData: AliasData) => Promise<boolean>;
  handleExecAlias: (command: string) => Promise<null | boolean>;
}
declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}
