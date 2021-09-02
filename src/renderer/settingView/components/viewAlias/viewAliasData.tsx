import React from 'react';

import ViewAliasName from './viewAliasName';
import ViewAliasCommand from './viewAliasCommand';

import styles from '../../../styles/settingView.module.css';

interface Props {
  aliasItem: AliasItem;
  selectAliasItem: (e: React.MouseEvent<HTMLElement>, id: Id) => void;
}

const ViewAliasData: React.FC<Props> = React.memo(
  ({ aliasItem, selectAliasItem }) => {
    return (
      <div id={aliasItem.id.toString()} className={styles.layout}>
        <ViewAliasName
          aliasItem={aliasItem}
          selectAliasItem={selectAliasItem}
        />
        <ViewAliasCommand
          aliasItem={aliasItem}
          selectAliasItem={selectAliasItem}
        />
      </div>
    );
  }
);

ViewAliasData.displayName = 'ViewAliasData';

export default ViewAliasData;
