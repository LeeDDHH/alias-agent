import { setGlobalSettings } from '../settings/GlobalSettings';
import { initGlobalShortCut } from '../globalShortcuts/GlobalShortcut';
import { initAliasSettings } from '../settings/alias';
import { initAliasData } from '../alias/alias';

const prepareApp = async (): Promise<void> => {
  await setGlobalSettings();
  await initGlobalShortCut();
  await initAliasSettings();
  await initAliasData();
};

export { prepareApp };
