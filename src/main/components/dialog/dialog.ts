import { dialog } from 'electron';

const execFailedDialog = () => {
  dialog.showMessageBoxSync({
    type: 'info',
    message: '実行中に問題が発生しました',
  });
};

export { execFailedDialog };
