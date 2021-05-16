import React from 'react';

import AliasName from './aliasName';
import AliasCommand from './aliasCommand';

import styles from '../../../styles/settingView.module.css';

interface Props {
  aliasItem: AliasItem;
  changeAliasName: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  changeAliasCommand: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}

const AliasData: React.FC<Props> = ({
  aliasItem,
  changeAliasName,
  changeAliasCommand,
}) => {
  return (
    <div
      id={aliasItem.id.toString()}
      key={aliasItem.id}
      className={styles.layout}>
      <AliasName aliasItem={aliasItem} changeAliasName={changeAliasName} />
      <AliasCommand
        aliasItem={aliasItem}
        changeAliasCommand={changeAliasCommand}
      />
    </div>
  );
};

export default AliasData;
