import { dialog } from 'electron';

const execFailedDialog = (): void => {
  dialog.showMessageBoxSync({
    type: 'info',
    message: '実行中に問題が発生しました',
  });
};

export { execFailedDialog };
