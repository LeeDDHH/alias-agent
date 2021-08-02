declare type GlobalShortCutRegisterResultItem = {
  index:
    | 'canNotRegistered'
    | 'alreadyRegisteredButUse'
    | 'registerSuccess'
    | 'registerable';
  text: string;
};

declare type CanNotRegistered = {
  index: 'canNotRegistered';
  text: string;
};

declare type AlreadyRegisteredButUse = {
  index: 'alreadyRegisteredButUse';
  text: string;
};

declare type RegisterSuccess = {
  index: 'registerSuccess';
  text: string;
};

declare type Registerable = {
  index: 'registerable';
  text: string;
};

declare interface GlobalShortCutRegisterResult {
  [key: string]: GlobalShortCutRegisterResultItem;
  canNotRegistered: CanNotRegistered;
  alreadyRegisteredButUse: AlreadyRegisteredButUse;
  registerSuccess: RegisterSuccess;
  registerable: Registerable;
}

declare type GlobalShortCutRegisterIndex =
  | 'canNotRegistered'
  | 'alreadyRegisteredButUse'
  | 'registerSuccess'
  | 'registerable';

declare type NoNameFUnctionReturnVoid = () => void;
