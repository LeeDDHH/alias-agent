import React from 'react';

interface Props {
  aliasItem: AliasItem;
  changeAliasName: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

const AliasName: React.FC<Props> = ({ aliasItem, changeAliasName }) => {
  return (
    <input
      type="text"
      name="aliasName"
      onChange={(e) => changeAliasName(e, aliasItem.id)}
      value={aliasItem.name}
    />
  );
};

export default AliasName;
