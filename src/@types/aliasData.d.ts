declare type AliasItem = {
  id: number;
  name: string;
  value: string;
};

declare type AliasData = AliasItem[];

declare type AliasDataList = {
  alias: AliasData | [];
  meta: {
    shellType: string;
  };
};
