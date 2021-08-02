import path from 'path';
import { app, globalShortcut } from 'electron';
import { mainViewToggle } from '../windows/WindowsEvents';
import { isExistFile, writeSync, readJsonFile } from '../../../lib/Utility';
import {
  globalSettingJsonName,
  defaultMainViewToggleShortcut,
} from '../../../lib/Const';
import { globalShortCutRegisterResult } from '../../../data/globalShortCutRegisterResult';

// グローバルショートカットキーの解除をしないステータスの一覧
const _doNotUnregisterProcessList: GlobalShortCutRegisterIndex[] = [
  globalShortCutRegisterResult.canNotRegistered.index,
  globalShortCutRegisterResult.registerable.index,
];

// 修飾キーの一覧
const _modifierKeyArray = [
  'Command',
  'Control',
  'Alt',
  'Option',
  'AltGr',
  'Shift',
  'Super',
  'Meta',
];

/*
  グローバルショートカット登録時のステータス
  canNotRegistered         登録できなかったとき
  alreadyRegisteredButUse  システムで登録されたショートカットを使う
  registerSuccess          登録に成功したとき
  registerable             空の文字列を登録しよとしたとき
*/
let _globalShortcutStatus: GlobalShortCutRegisterIndex;

// 現在登録したショートカット
let _currentGlobalShortcut = '';

// グローバルショートカットキーのデータを保存するファイルのパス
const _getGlobalSettingsFilePath: string = path.join(
  app.getPath('userData'),
  globalSettingJsonName
);

/*
  登録しようとするショートカットがすでにシステムで登録されているキーなのかを判定する
  true  すでに登録されている
  false 登録されていない
*/
const _isGlobalShortCutAlreadyRegistered = (shortcut: string): boolean => {
  return !globalShortcut.isRegistered(shortcut);
};

// ショートカットキーが空かどうかを判定する
const _isShortCutKeyIsEmpty = (shortcut: string | string[]): boolean => {
  return shortcut.length < 1;
};

// 引数のグローバルショートカットキーを登録する
const _registerGlobalShortCut = (
  shortcut: string
): GlobalShortCutRegisterIndex => {
  // グローバルショートカットキーの登録済みフラグ
  let alreadyRegistered = false;

  // 引数のショートカットキーが空の場合
  if (_isShortCutKeyIsEmpty(shortcut)) {
    // グローバルショートカット登録ステータスを「登録可能な状態」にして、ステータスを返す
    _globalShortcutStatus = globalShortCutRegisterResult.registerable.index;
    return globalShortCutRegisterResult.registerable.index;
  }

  // すでに登録されているショートカットキーの場合、グローバルショートカットキーの登録済みフラグを有効にする
  if (_isGlobalShortCutAlreadyRegistered(shortcut)) alreadyRegistered = true;

  // 登録の結果を格納する
  const ret: boolean = globalShortcut.register(shortcut, () => {
    mainViewToggle();
  });

  // グローバルショートカットキーの登録に失敗した場合
  if (!ret) {
    // 現在登録したショートカットを空にする
    _currentGlobalShortcut = '';
    // グローバルショートカット登録ステータスを「登録できなかった」にする
    _globalShortcutStatus = globalShortCutRegisterResult.canNotRegistered.index;
  } else {
    // グローバルショートカットキーの登録に成功した場合
    // 現在登録したショートカットを登録したショートカットにする
    _currentGlobalShortcut = shortcut;
    /*
      グローバルショートカットキーの登録済みフラグの状態を参照してグローバルショートカット登録ステータスを更新する
      - 有効の場合は、「システムで登録されたショートカットを使う」に更新する
      - 無効の場合は、「登録に成功」に更新する
    */
    _globalShortcutStatus = alreadyRegistered
      ? globalShortCutRegisterResult.alreadyRegisteredButUse.index
      : globalShortCutRegisterResult.registerSuccess.index;
  }

  // グローバルショートカット登録ステータスを返す
  return _globalShortcutStatus;
};

// 引数のショートカットをファイルに保存する
const _saveGlobalShortCut = async (shortcut: string) => {
  // 保存用のオブジェクト形式にする
  const globalShortcut = { globalShortcut: shortcut };
  try {
    // 保存する
    return writeSync<GlobalShortcut>(
      _getGlobalSettingsFilePath,
      globalShortcut
    );
  } catch (e) {
    console.log('[GlobalShortcut]' + '_saveGlobalShortCut: ' + e);
    return false;
  }
};

/*
  ショートカットのキー配列が修飾キーのみなのかを判定する
  true  すべての要素のが要素のが修飾キー
  false 修飾キー以外の要素あり
*/
const _isOnlyModifiers = (keyArray: string[]) => {
  return keyArray.every((key) => _modifierKeyArray.includes(key));
};

// グローバルショートカットキーを解除する
const _unRegisterGlobalShortCut = (): void => {
  /*
    以下の条件をすべて満たしているときにグローバルショートカットキーを解除する
    - 現在のグローバルショートカット登録ステータスが「登録できなかった」、「登録可能な状態」以外
    - 現在のグローバルショートカットキーが空ではない
  */
  if (
    !_doNotUnregisterProcessList.includes(_globalShortcutStatus) &&
    !_isShortCutKeyIsEmpty(_currentGlobalShortcut)
  ) {
    // グローバルショートカットキーを解除し、「登録可能な状態」にグローバルショートカット登録ステータスを更新する
    globalShortcut.unregister(_currentGlobalShortcut);
    _globalShortcutStatus = globalShortCutRegisterResult.registerable.index;
  }
};

// グローバルショートカットキーをファイルから読み込む
const _getGlobalShortcutFromFile = async (): Promise<string> => {
  // グローバルショートカットのデフォルトデータ
  let mainViewToggleShortcut = defaultMainViewToggleShortcut;

  // グローバルショートカットキーが保存されたデータが存在する場合
  if (isExistFile(_getGlobalSettingsFilePath)) {
    let data;
    try {
      data = await readJsonFile(_getGlobalSettingsFilePath);
      // 現在のグローバルショートカットキーと返り値を読み込んだデータにする
      _currentGlobalShortcut = mainViewToggleShortcut = data.globalShortcut;
    } catch (e) {
      console.log('[GlobalShortcut]' + 'getMainViewToggleShortcut: ' + e);
    }
  }

  return mainViewToggleShortcut;
};

// グローバルショートカットキーを更新する
const updateGlobalShortCut = async (
  keys: HotKeys
): Promise<GlobalShortCutRegisterIndex> => {
  // 現在のグローバルショートカットキーを解除する
  _unRegisterGlobalShortCut();

  // 引数のショートカットキーが空なのかを判定する
  if (_isShortCutKeyIsEmpty(keys)) {
    // 引数のショートカットキーが空の場合
    // ショートカットを空にしてファイルに保存する
    await _saveGlobalShortCut('');
    // 「登録可能な状態」のグローバルショートカット登録ステータスを返す
    return globalShortCutRegisterResult.registerable.index;
  }

  // ショートカットのキー配列が修飾キーのみの場合
  if (_isOnlyModifiers(keys)) {
    // グローバルショートカット登録ステータスを「登録できなかった」にする
    _globalShortcutStatus = globalShortCutRegisterResult.canNotRegistered.index;
    return _globalShortcutStatus;
  }

  // ショートカットキーの配列を「+」に連結する
  const shortcut = keys.join('+');

  // グローバルショートカットキーを登録し、
  const result = _registerGlobalShortCut(shortcut);

  // グローバルショートカットキーの登録結果が「登録できなかった」場合
  if (result === globalShortCutRegisterResult.canNotRegistered.index) {
    // ショートカットを空にしてファイルに保存する
    await _saveGlobalShortCut('');
  } else {
    // ショートカットをファイルに保存する
    await _saveGlobalShortCut(shortcut);
  }

  // グローバルショートカット登録ステータスを返す
  return result;
};

// グローバルショートカットキーの初期化をする
const initGlobalShortCut = async (): Promise<void> => {
  // グローバルショートカットキーをファイルから読み込み、グローバルショートカットキーに登録する
  const recordShortCut: string = await _getGlobalShortcutFromFile();
  const result: GlobalShortCutRegisterIndex = _registerGlobalShortCut(
    recordShortCut
  );

  console.log('【GlobalShortCut】 ' + 'initGlobalShortCut: ' + result);
};

// アプリの終了前にグローバルショートカットキーを解除する
const unSetAllGlobalShortcut = (): void => {
  globalShortcut.unregister(_currentGlobalShortcut);
  globalShortcut.unregisterAll();
};

// 現在のグローバルショートカットステータスを返す
const getCurrentGlobalShortcutStatus = (): GlobalShortCutRegisterIndex => {
  return _globalShortcutStatus;
};

const getCurrentGlobalShortcut = (): string => {
  return _currentGlobalShortcut;
};

export {
  updateGlobalShortCut,
  initGlobalShortCut,
  unSetAllGlobalShortcut,
  getCurrentGlobalShortcutStatus,
  getCurrentGlobalShortcut,
};
