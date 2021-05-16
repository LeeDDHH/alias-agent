import React from 'react';

interface Props {
  aliasItem: AliasItem;
  changeAliasCommand: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}

const AliasCommand: React.FC<Props> = ({ aliasItem, changeAliasCommand }) => {
  return (
    <input
      type="text"
      name="aliasCommand"
      onChange={(e) => changeAliasCommand(e, aliasItem.id)}
      value={aliasItem.name}
    />
  );
};

export default AliasCommand;
