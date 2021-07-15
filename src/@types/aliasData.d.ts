declare type Id = number;
declare type AliasName = string;
declare type AliasValue = string;

declare type AliasItem = {
  id: Id;
  name: AliasName;
  value: AliasValue;
};

declare type AliasData = AliasItem[];

declare type AliasDataList = {
  alias: AliasData | [];
  meta: {
    shellType: string;
  };
};
