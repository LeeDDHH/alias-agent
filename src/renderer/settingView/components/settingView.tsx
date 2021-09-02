import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { isUndefinedOrNull } from '@/lib/TypeCheck';
import { convertKeyboardKey } from '@/lib/KeyboardLayout';
import { isIdInAliasData } from '@/lib/Validate';
import AliasData from './alias/aliasData';
import ViewAliasData from './viewAlias/viewAliasData';

import { tempAliasItem } from '@/data/tempAliasItem';
import { globalShortCutRegisterResult } from '@/data/globalShortCutRegisterResult';

import styles from '@/renderer/styles/settingView.module.css';

const SettingView = React.memo(() => {
  const [keys, setKeys] = useState<HotKeys>([]);
  const [
    globalShortcutStatus,
    setGlobalShortcutStatus,
  ] = useState<GlobalShortCutRegisterIndex>(
    globalShortCutRegisterResult.canNotRegistered.index
  );
  const [alias, setAlias] = useState<AliasData>([]);
  const [editItemId, setEditItemId] = useState<number>(-1);
  const [isEditAliasItem, setIsEditAliasItem] = useState<boolean>(false);
  const [tempEditAliasItem, setTempEditAliasItem] = useState<AliasItem>(
    tempAliasItem
  );
  // const [input, setInput] = useState('');
  // const [message, setMessage] = useState<string | null>('');
  const getMainViewToggleShortcut = useCallback(async (): Promise<void> => {
    const mainViewToggleShortcut: string = await window.ipcApi.handleGetMainViewToggleShortcut();
    const globalShortcutStatus: GlobalShortCutRegisterIndex = await window.ipcApi.handleGetGlobalShortcutStatus();
    const shortcutKeyArray: HotKeys =
      mainViewToggleShortcut.length > 0
        ? mainViewToggleShortcut.split('+')
        : [];
    setKeys(shortcutKeyArray);
    console.log('getMainViewToggleShortcut: ' + globalShortcutStatus);
    setGlobalShortcutStatus(globalShortcutStatus);
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
    setAlias(aliasData);
    // addEmptyAliasItem(aliasData);
  }, [generateEmptyAliasItem]);

  useEffect(() => {
    //   const handleMessage = (event, message) => setMessage(message)
    //   window.ipcApi.on('message', handleMessage)
    //   return () => {
    //     window.ipcRenderer.removeListener('message', handleMessage)
    //   }
    getMainViewToggleShortcut();
    getAliasData();
  }, [getAliasData, getMainViewToggleShortcut]);

  const resetKeys = useCallback(async (): Promise<void> => {
    setKeys([]);
    const result: GlobalShortCutRegisterIndex = await window.ipcApi.handleSetMainViewToggleShortcut(
      []
    );
    setGlobalShortcutStatus(result);
  }, []);

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

  const saveGlobalShortCut = useCallback(
    async (evt: React.FocusEvent<HTMLInputElement>): Promise<void> => {
      const result: GlobalShortCutRegisterIndex = await window.ipcApi.handleSetMainViewToggleShortcut(
        keys
      );
      setGlobalShortcutStatus(result);
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

  const selectAliasItem = useCallback(
    (evt: React.MouseEvent<HTMLElement>, id: Id) => {
      if (!isIdInAliasData(alias, id)) return;
      console.log('is valid id');
      setEditItemId(id);
      setTempEditAliasItem(alias[id]);
      setIsEditAliasItem(true);
    },
    [alias]
  );

  const changeAliasInput = useCallback(
    (
      evt: React.ChangeEvent<HTMLInputElement>,
      id: number,
      type: 'name' | 'value'
    ): void => {
      console.log(tempEditAliasItem);
      const newTempEditAliasItem = JSON.parse(
        JSON.stringify(tempEditAliasItem)
      );
      console.log(newTempEditAliasItem);
      if (type === 'name') {
        newTempEditAliasItem.name = evt.target.value;
      } else {
        newTempEditAliasItem.value = evt.target.value;
      }
      setTempEditAliasItem(newTempEditAliasItem);

      // // 変更するAliasのインデックスを配列から特定する
      // const aliasIndex: number = findAliasIndex(id);
      // // 変更するAliasが見つからなかったら何も変更しない
      // if (isUndefinedOrNull<number>(aliasIndex)) return;

      // // Aliasを新しい配列にして、Aliasを変更する
      // const newAlias = alias.concat();
      // if (type === 'name') {
      //   newAlias[aliasIndex].name = evt.target.value;
      // } else {
      //   newAlias[aliasIndex].value = evt.target.value;
      // }
      // setAlias(newAlias);
    },
    [tempEditAliasItem]
  );

  const changeEditItemId = useCallback(
    (evt: React.FocusEvent<HTMLInputElement>) => {
      console.log(evt.currentTarget);
    },
    []
  );

  const saveAlias = useCallback(
    async (newAlias: AliasData): Promise<boolean> => {
      return await window.ipcApi.handleSaveAliasData(newAlias);
    },
    []
  );

  const saveAliasItem = useCallback(
    async (evt: React.MouseEvent<HTMLElement>, id: Id): Promise<void> => {
      evt.preventDefault();
      // // 変更するAliasのインデックスを配列から特定する
      const aliasIndex: number = findAliasIndex(id);
      // // 変更するAliasが見つからなかったら何も変更しない
      if (isUndefinedOrNull<number>(aliasIndex)) return;

      // // Aliasを新しい配列にして、Aliasを変更する
      const newAlias = alias.concat();
      newAlias[aliasIndex] = tempEditAliasItem;
      setAlias(newAlias);

      const result = await saveAlias(newAlias);
      console.log(result);

      closeEditAliasWindow(evt);
    },
    [alias, findAliasIndex, tempEditAliasItem, saveAlias]
  );

  const viewAliasData = useMemo((): JSX.Element | '' => {
    if (alias.length === 0) return '';
    const aliasData = alias.map((item: AliasItem) => {
      return (
        <ViewAliasData
          key={item.id}
          aliasItem={item}
          selectAliasItem={selectAliasItem}
        />
      );
    });
    const aliasLayout = (
      // <form onSubmit={saveAlias}>
      //   {aliasData}
      //   <button type="submit">保存</button>
      // </form>
      <div className={styles.layoutContainer}>{aliasData}</div>
    );
    return aliasLayout;
  }, [alias, selectAliasItem]);

  const closeEditAliasWindow = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setEditItemId(-1);
    setTempEditAliasItem(tempAliasItem);
    setIsEditAliasItem(false);
  };

  const viewEditAliasWindow = useMemo((): JSX.Element | null => {
    if (
      !alias ||
      !isEditAliasItem ||
      editItemId < 0 ||
      tempEditAliasItem.id < 0
    ) {
      return null;
    }
    return (
      <AliasData
        aliasItem={tempEditAliasItem}
        changeAliasInput={changeAliasInput}
        closeEditAliasWindow={closeEditAliasWindow}
        saveAliasItem={saveAliasItem}
      />
    );
  }, [
    alias,
    isEditAliasItem,
    editItemId,
    tempEditAliasItem,
    changeAliasInput,
    saveAliasItem,
  ]);

  console.log('globalShortcutStatus: ' + globalShortcutStatus);
  return (
    <>
      {viewEditAliasWindow}
      <div className={styles.height100}>
        <input
          className={`${styles.width100}`}
          onKeyDown={(e) => keyDownAction(e)}
          onBlur={(e) => saveGlobalShortCut(e)}
          readOnly={true}
          value={visualKeys}
        />
        <input type="button" onClick={resetKeys} value={'Clear'} />
        {globalShortcutStatus ? (
          <span>{globalShortCutRegisterResult[globalShortcutStatus].text}</span>
        ) : null}
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
    </>
  );
});

SettingView.displayName = 'SettingView';

export default SettingView;
