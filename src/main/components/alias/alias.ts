import util from 'util';
import { exec } from 'child_process';
import { writeSync, readJsonFile } from '../../../lib/Utility';
import { getAliasSettingsFilePath } from '../settings/alias';
import { validateAliasData } from '../../../lib/Validate';

import _initialData from '../../../data/alias';

let aliasDataList: AliasDataList;

const getAliasDataOnMemory = (): AliasData => {
  return aliasDataList.alias;
};

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
      aliasDataList = _initialData;
    } else {
      aliasDataList = data;
    }
  } catch (e) {
    console.log('aliasSettingsFile read failed: ' + e);
    aliasDataList = _initialData;
  }
};

const _findAliasName = (command: string): AliasItem | false => {
  const aliasItem = aliasDataList.alias.find((item) => item.name === command);
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

/*
    保存前の処理
    - ◯バリデーション
    - ◯try...catch
    - ◯保存
  */
const saveAliasData = async (
  modifiedAliasData: AliasData
): Promise<boolean> => {
  if (!validateAliasData(modifiedAliasData)) return false;

  aliasDataList.alias = modifiedAliasData;

  try {
    return writeSync<AliasDataList>(getAliasSettingsFilePath, aliasDataList);
  } catch (e) {
    console.log('[alias]' + 'saveAliasData: ' + e);
    return false;
  }
};

export {
  aliasDataList,
  getAliasDataOnMemory,
  getAliasDataFromFile,
  initAliasData,
  execCommand,
  saveAliasData,
};
