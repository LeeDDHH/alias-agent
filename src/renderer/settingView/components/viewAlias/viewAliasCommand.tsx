import React from 'react';

interface Props {
  aliasItem: AliasItem;
  selectAliasItem: (e: React.MouseEvent<HTMLElement>, id: Id) => void;
}

const ViewAliasCommand: React.FC<Props> = React.memo(
  ({ aliasItem, selectAliasItem }) => {
    return (
      <span onDoubleClick={(e) => selectAliasItem(e, aliasItem.id)}>
        {aliasItem.value}
      </span>
    );
  }
);

ViewAliasCommand.displayName = 'ViewAliasCommand';

export default ViewAliasCommand;
