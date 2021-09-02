import React from 'react';

import styles from '../../../styles/settingView.module.css';

interface Props {
  aliasItem: AliasItem;
  changeAliasName: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: 'name'
  ) => void;
}

const AliasName: React.FC<Props> = React.memo(
  ({ aliasItem, changeAliasName }) => {
    return (
      <input
        // className={styles.aliasArea}
        type="text"
        name="aliasName"
        onChange={(e) => changeAliasName(e, aliasItem.id, 'name')}
        value={aliasItem.name}
      />
    );
  }
);

AliasName.displayName = 'AliasName';

export default AliasName;
