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
}

const AliasData: React.FC<Props> = ({ aliasItem, changeAliasInput }) => {
  return (
    <div id={aliasItem.id.toString()} className={styles.layout}>
      <AliasName aliasItem={aliasItem} changeAliasName={changeAliasInput} />
      <AliasCommand
        aliasItem={aliasItem}
        changeAliasCommand={changeAliasInput}
      />
    </div>
  );
};

export default AliasData;
