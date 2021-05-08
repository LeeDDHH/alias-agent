import { setGlobalSettings } from '../settings/GlobalSettings';
import { setAllGlobalShortcut } from '../globalShortcuts/GlobalShortcut';

const prepareApp = async () => {
  await setGlobalSettings();
  await setAllGlobalShortcut();
};

export { prepareApp };
