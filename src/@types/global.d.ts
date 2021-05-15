export default interface IpcApi {
  handleMessage: (message: string) => Promise<null | string>;
  handleInitInputValue: (callback: Function) => void;
  handleGetMainViewToggleShortcut: () => Promise<string>;
  handleExecAlias: (command: string) => Promise<null | boolean>;
}
declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}
