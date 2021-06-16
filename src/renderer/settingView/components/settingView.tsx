import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { isUndefinedOrNull } from '../../../lib/TypeCheck';
import { convertKeyboardKey } from '../../../lib/KeyboardLayout';
import AliasData from './alias/aliasData';

import styles from '../../styles/settingView.module.css';

const SettingView = () => {
  const [keys, setKeys] = useState<HotKeys>([]);
  const [alias, setAlias] = useState<AliasData>([]);
  // const [input, setInput] = useState('');
  // const [message, setMessage] = useState<string | null>('');
  const getMainViewToggleShortcut = async () => {
    const mainViewToggleShortcut: string = await window.ipcApi.handleGetMainViewToggleShortcut();
    const shortcutKeyArray: HotKeys = mainViewToggleShortcut.split('+');
    setKeys(shortcutKeyArray);
  };

  const generateEmptyAliasItem = (maxId: number) => {
    return { id: maxId + 1, name: '', value: '' };
  };

  const getNextAliasItemId = (aliasData: AliasData) => {
    const idArray = () => {
      return aliasData.map((item: AliasItem) => {
        return item.id;
      });
    };
    return Math.max(...idArray());
  };

  const getAliasData = async () => {
    const aliasData: AliasData = await window.ipcApi.handleGetAliasData();
    if (isUndefinedOrNull(aliasData))
      return setAlias([generateEmptyAliasItem(-1)]);
    const maxId = getNextAliasItemId(aliasData);
    aliasData.push(generateEmptyAliasItem(maxId));
    setAlias(aliasData);
  };

  useEffect(() => {
    //   const handleMessage = (event, message) => setMessage(message)
    //   window.ipcApi.on('message', handleMessage)
    //   return () => {
    //     window.ipcRenderer.removeListener('message', handleMessage)
    //   }
    getMainViewToggleShortcut();
    getAliasData();
  }, []);

  const resetKeys = () => setKeys([]);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const result = await window.ipcApi.handleMessage(input);
  //   setMessage(result);
  // };

  const keyDownAction = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const newKeys = convertKeyboardKey(evt, keys);
    setKeys(newKeys);
  };

  const visualKeys = () => {
    if (keys.length === 0) return '';
    return keys.join('+');
  };

  const findAliasIndex = useCallback(
    (id: number) => alias.findIndex((i) => i.id === id),
    [alias]
  );

  const changeAliasInput = useCallback(
    (
      evt: React.ChangeEvent<HTMLInputElement>,
      id: number,
      type: 'name' | 'value'
    ) => {
      // 変更するAliasのインデックスを配列から特定する
      const aliasIndex = findAliasIndex(id);
      // 変更するAliasが見つからなかったら何も変更しない
      if (isUndefinedOrNull(aliasIndex)) return;

      // Aliasを新しい配列にして、Aliasを変更する
      const newAlias = alias.concat();
      if (type === 'name') {
        newAlias[aliasIndex].name = evt.target.value;
      } else {
        newAlias[aliasIndex].value = evt.target.value;
      }
      setAlias(newAlias);
    },
    [alias, findAliasIndex]
  );

  const saveAlias = useCallback(
    (evt: React.FormEvent) => {
      console.log(alias);
      evt.preventDefault();
      window.ipcApi.handleSaveAliasData(alias);
    },
    [alias]
  );

  const viewAliasData = useMemo(() => {
    if (alias.length === 0) return '';
    const aliasData = alias.map((item: AliasItem) => {
      return (
        <AliasData
          key={item.id}
          aliasItem={item}
          changeAliasInput={changeAliasInput}
        />
      );
    });
    const aliasLayout = (
      <form onSubmit={saveAlias}>
        {aliasData}
        <button type="submit">保存</button>
      </form>
    );
    return aliasLayout;
  }, [alias, changeAliasInput, saveAlias]);

  return (
    <div className={styles.height100}>
      <input
        className={`${styles.width100}`}
        onKeyDown={(e) => keyDownAction(e)}
        readOnly={true}
        value={visualKeys()}
      />
      <input type="button" onClick={resetKeys} value={'Clear'} />
      {viewAliasData}
      {/* {message && <p>{message}</p>}

      <form className={styles.height100} onSubmit={handleSubmit}>
        <input
          className={`${styles.height100} ${styles.width100} ${styles.font}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form> */}
    </div>
  );
};

export default SettingView;
