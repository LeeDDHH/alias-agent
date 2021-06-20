import React from 'react';

interface Props {
  aliasItem: AliasItem;
  changeAliasCommand: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: 'value'
  ) => void;
}

const AliasCommand: React.FC<Props> = React.memo(
  ({ aliasItem, changeAliasCommand }) => {
    return (
      <input
        type="text"
        name="aliasCommand"
        onChange={(e) => changeAliasCommand(e, aliasItem.id, 'value')}
        value={aliasItem.value}
      />
    );
  }
);

AliasCommand.displayName = 'AliasCommand';

export default AliasCommand;
