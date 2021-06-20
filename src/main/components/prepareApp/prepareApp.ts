import { setGlobalSettings } from '../settings/GlobalSettings';
import { setAllGlobalShortcut } from '../globalShortcuts/GlobalShortcut';
import { initAliasSettings } from '../settings/alias';
import { initAliasData } from '../alias/alias';

const prepareApp = async (): Promise<void> => {
  await setGlobalSettings();
  await setAllGlobalShortcut();
  await initAliasSettings();
  await initAliasData();
};

export { prepareApp };
