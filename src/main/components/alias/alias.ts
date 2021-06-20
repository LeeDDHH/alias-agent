import util from 'util';
import { exec } from 'child_process';
import { readJsonFile } from '../../../lib/Utility';
import { getAliasSettingsFilePath } from '../settings/alias';

import _initialData from '../../../data/alias';

let aliasData: AliasData;

const getAliasDataFromFile = async (): Promise<AliasDataList> => {
  try {
    return await readJsonFile(getAliasSettingsFilePath);
  } catch (e) {
    console.log('aliasSettingsFile read failed: ' + e);
    return _initialData;
  }
};

const initAliasData = async (): Promise<void> => {
  let data: AliasDataList | null;
  try {
    data = await getAliasDataFromFile();
    if (!data || !data.alias || data.alias.length < 1) {
      aliasData = _initialData.alias;
    }
    aliasData = data.alias;
  } catch (e) {
    console.log('aliasSettingsFile read failed: ' + e);
    aliasData = _initialData.alias;
  }
};

const _findAliasName = (command: string): AliasItem | false => {
  const aliasItem = aliasData.find((item) => item.name === command);
  return aliasItem ?? false;
};

const execCommand = async (command: string): Promise<boolean> => {
  /*
    IDEA
    - 受け取った文字列をスペース区切りで分割する
    - 配列の最初の文字列から、対応する
  */
  const result = _findAliasName(command);
  if (!result) return false;

  const sandwichQuoteForCommand = `${result.value}`;
  const execPromise = util.promisify(exec);
  try {
    const { stdout, stderr } = await execPromise(sandwichQuoteForCommand);
    console.log(stdout);
    console.log(stderr);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;

  // const result = await execp(sandwichQuoteForCommand, (err, stdout, stderr) => {
  //   console.log('execCommandA');
  //   if (stdout || stderr) {
  //     console.log('execCommandC');
  //     const res = dialog.showMessageBoxSync({
  //       type: 'info',
  //       message: '実行中に問題が発生しました',
  //     });
  //     return false;
  //   }
  //   console.log('execCommandB');
  //   return true;
  // });

  // return { result: result };
};

const validateAliasData = () => {};

const saveAliasData = async (aliasData: AliasData) => {};

export { aliasData, getAliasDataFromFile, initAliasData, execCommand };
