export default interface IpcApi {
  handleMessage: (message: string) => Promise<null | string>;
}
declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}
