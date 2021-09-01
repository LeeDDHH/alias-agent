import os from 'os';

import { systemPreferences } from 'electron';
import { isDev } from './Compile';

const isWin32 = os.platform() === 'win32';
const isDarwin = os.platform() === 'darwin';
const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
const extDir = isDarwin
  ? // macOS
    '/Library/Application Support/Google/Chrome'
  : isWin32
  ? // Windows
    '/AppData/Local/Google/Chrome/User Data'
  : // Linux
    '/.config/google-chrome';
const trayImage = isDev
  ? 'src/images/terminal16x16.png'
  : 'dist/main/images/terminal16x16.png';
const defaultMainViewToggleShortcut = 'Control+Space';
const mainViewPort = '4000';
const settingViewPort = '4001';
const globalSettingJsonName = 'global_setting.json';
const aliasSettingJsonName = 'alias.json';
const systemAccentColor = systemPreferences.getAccentColor();

export {
  reactDevtools,
  extDir,
  trayImage,
  defaultMainViewToggleShortcut,
  mainViewPort,
  settingViewPort,
  globalSettingJsonName,
  aliasSettingJsonName,
  systemAccentColor,
};
