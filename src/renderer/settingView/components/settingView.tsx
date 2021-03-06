import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { isUndefinedOrNull } from '../../../lib/TypeCheck';
import { convertKeyboardKey } from '../../../lib/KeyboardLayout';
import AliasData from './alias/aliasData';

import styles from '../../styles/settingView.module.css';

const SettingView = React.memo(() => {
  const [keys, setKeys] = useState<HotKeys>([]);
  const [alias, setAlias] = useState<AliasData>([]);
  const [editItemId, setEditItemId] = useState<number>(-1);
  // const [input, setInput] = useState('');
  // const [message, setMessage] = useState<string | null>('');
  const getMainViewToggleShortcut = useCallback(async (): Promise<void> => {
    const mainViewToggleShortcut: string = await window.ipcApi.handleGetMainViewToggleShortcut();
    const shortcutKeyArray: HotKeys = mainViewToggleShortcut.split('+');
    setKeys(shortcutKeyArray);
  }, []);

  const generateEmptyAliasItem = useCallback((maxId: number): AliasItem => {
    return { id: maxId + 1, name: '', value: '' };
  }, []);

  const getNextAliasItemId = useCallback((aliasData: AliasData): number => {
    const idArray = () => {
      return aliasData.map((item: AliasItem) => {
        return item.id;
      });
    };
    return Math.max(...idArray());
  }, []);

  const addEmptyAliasItem = useCallback(
    (aliasData: AliasData) => {
      const maxId = getNextAliasItemId(aliasData);
      aliasData.push(generateEmptyAliasItem(maxId));
      setAlias(aliasData);
    },
    [getNextAliasItemId, generateEmptyAliasItem]
  );

  const getAliasData = useCallback(async (): Promise<void> => {
    const aliasData: AliasData = await window.ipcApi.handleGetAliasData();
    if (isUndefinedOrNull<AliasData>(aliasData))
      return setAlias([generateEmptyAliasItem(-1)]);
    addEmptyAliasItem(aliasData);
  }, [generateEmptyAliasItem, addEmptyAliasItem]);

  useEffect(() => {
    //   const handleMessage = (event, message) => setMessage(message)
    //   window.ipcApi.on('message', handleMessage)
    //   return () => {
    //     window.ipcRenderer.removeListener('message', handleMessage)
    //   }
    getMainViewToggleShortcut();
    getAliasData();
  }, [getAliasData, getMainViewToggleShortcut]);

  const resetKeys = useCallback((): void => setKeys([]), []);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const result = await window.ipcApi.handleMessage(input);
  //   setMessage(result);
  // };

  const keyDownAction = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>): void => {
      const newKeys = convertKeyboardKey(evt, keys);
      setKeys(newKeys);
    },
    [keys]
  );

  const visualKeys = useMemo((): string => {
    if (keys.length === 0) return '';
    return keys.join('+');
  }, [keys]);

  const findAliasIndex = useCallback(
    (id: number): number => alias.findIndex((i) => i.id === id),
    [alias]
  );

  const changeAliasInput = useCallback(
    (
      evt: React.ChangeEvent<HTMLInputElement>,
      id: number,
      type: 'name' | 'value'
    ): void => {
      // ????????????Alias????????????????????????????????????????????????
      const aliasIndex: number = findAliasIndex(id);
      // ????????????Alias???????????????????????????????????????????????????
      if (isUndefinedOrNull<number>(aliasIndex)) return;

      // Alias??????????????????????????????Alias???????????????
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

  const changeEditItemId = useCallback(
    (evt: React.FocusEvent<HTMLInputElement>) => {
      console.log(evt.currentTarget);
    },
    []
  );

  const saveAliasItem = useCallback(
    async (evt: React.FocusEvent): Promise<void> => {
      evt.preventDefault();
    },
    []
  );

  const saveAlias = useCallback(
    async (evt: React.FormEvent): Promise<void> => {
      console.log(alias);
      evt.preventDefault();
      const result = await window.ipcApi.handleSaveAliasData(alias);
      if (result) {
        addEmptyAliasItem(alias);
      }
    },
    [alias, addEmptyAliasItem]
  );

  const viewAliasData = useMemo((): JSX.Element | '' => {
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
        <button type="submit">??????</button>
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
        value={visualKeys}
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
});

SettingView.displayName = 'SettingView';

export default SettingView;
