import path from 'path';
import { app } from 'electron';
import { makeFileIfNotExists } from '../../../lib/Utility';
import { globalSettingJsonName } from '../../../lib/Const';
import GlobalSetting from '../../../data/globalSetting';

const setGlobalSettings = async (): Promise<void> => {
  const globalSettingsFilePath = path.join(
    app.getPath('userData'),
    globalSettingJsonName
  );
  const data = GlobalSetting;
  await makeFileIfNotExists(globalSettingsFilePath, data);
};

export { setGlobalSettings };
