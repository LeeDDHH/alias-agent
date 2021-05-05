import React from 'react';

import { modifierKeys, convertModifierKey } from '../data/keyboardData';

// JavaScriptのコード名から、Electronで扱うコードに対応するコードがあれば、変換する
const _convertElectronKey = (code: string) => {
  return convertModifierKey[code] ?? code;
};

// キー配列にある一般キーを最後に入力された一般キーにする
const _setLastInputNormalKey = (codes: HotKeys, convertedKey: string) => {
  return codes.map((key: string) => {
    if (!modifierKeys.includes(key)) return convertedKey;
    return key;
  });
};

// 重複しているキーを排除する
const _reduceDuplicatedKeys = (codes: HotKeys) => Array.from(new Set(codes));

const convertKeyboardKey = (
  e: React.KeyboardEvent<HTMLInputElement>,
  keys: HotKeys
) => {
  // 入力されたキーを取得
  const code: string = e.nativeEvent.code;
  const convertedKey = _convertElectronKey(code);

  // 新しいキーの配列を作成
  const newCodes: HotKeys = [...keys, convertedKey];
  const convertedCodes: HotKeys = _setLastInputNormalKey(
    newCodes,
    convertedKey
  );
  return _reduceDuplicatedKeys(convertedCodes);
};

export { convertKeyboardKey };
