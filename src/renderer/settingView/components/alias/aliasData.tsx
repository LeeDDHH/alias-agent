import React from 'react';

import AliasName from './aliasName';
import AliasCommand from './aliasCommand';

import styles from '../../../styles/settingView.module.css';

interface Props {
  aliasItem: AliasItem;
  changeAliasInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: 'name' | 'value'
  ) => void;
  closeEditAliasWindow: (e: React.MouseEvent<HTMLElement>) => void;
  saveAliasItem: (e: React.MouseEvent<HTMLElement>, id: Id) => void;
}

const AliasData: React.FC<Props> = React.memo(
  ({ aliasItem, changeAliasInput, closeEditAliasWindow, saveAliasItem }) => {
    return (
      <>
        <div className={styles.modalLayout}>
          <div id={aliasItem.id.toString()} className={styles.aliasArea}>
            <AliasName
              aliasItem={aliasItem}
              changeAliasName={changeAliasInput}
            />
            <AliasCommand
              aliasItem={aliasItem}
              changeAliasCommand={changeAliasInput}
            />
          </div>
          <button onClick={closeEditAliasWindow}>閉じる</button>
          <button onClick={(e) => saveAliasItem(e, aliasItem.id)}>保存</button>
        </div>
        <div
          className={styles.modalLayoutBg}
          onClick={closeEditAliasWindow}></div>
      </>
    );
  }
);

AliasData.displayName = 'AliasData';

export default AliasData;
