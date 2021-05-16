import React from 'react';

interface Props {
  aliasItem: AliasItem;
  changeAliasName: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: 'name'
  ) => void;
}

const AliasName: React.FC<Props> = ({ aliasItem, changeAliasName }) => {
  return (
    <input
      type="text"
      name="aliasName"
      onChange={(e) => changeAliasName(e, aliasItem.id, 'name')}
      value={aliasItem.name}
    />
  );
};

export default AliasName;
