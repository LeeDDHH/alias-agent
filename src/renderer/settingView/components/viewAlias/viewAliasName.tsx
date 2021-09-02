import React from 'react';

interface Props {
  aliasItem: AliasItem;
  selectAliasItem: (e: React.MouseEvent<HTMLElement>, id: Id) => void;
}

const ViewAliasName: React.FC<Props> = React.memo(
  ({ aliasItem, selectAliasItem }) => {
    return (
      <span onDoubleClick={(e) => selectAliasItem(e, aliasItem.id)}>
        {aliasItem.name}
      </span>
    );
  }
);

ViewAliasName.displayName = 'ViewAliasName';

export default ViewAliasName;
