export default interface IpcApi {
  handleMessage: (message: string) => Promise<null | string>;
  handleInitInputValue: (callback: Function) => void;
}
declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}
