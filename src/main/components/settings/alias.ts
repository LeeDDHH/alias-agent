import path from 'path';
import { app } from 'electron';
import { makeFileIfNotExists } from '../../../lib/Utility';
import { aliasSettingJsonName } from '../../../lib/Const';
import AliasSetting from '../../../data/alias';

const getAliasSettingsFilePath = path.join(
  app.getPath('userData'),
  aliasSettingJsonName
);

const initAliasSettings = async () => {
  await makeFileIfNotExists(getAliasSettingsFilePath, AliasSetting);
};

export { getAliasSettingsFilePath, initAliasSettings };
