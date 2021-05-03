import os from 'os';

const isWin32 = os.platform() === 'win32';
const isDarwin = os.platform() === 'darwin';
const isDev = process.env.NODE_ENV === 'development';
const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
const extDir = isDarwin
  ? // macOS
    '/Library/Application Support/Google/Chrome'
  : isWin32
  ? // Windows
    '/AppData/Local/Google/Chrome/User Data'
  : // Linux
    '/.config/google-chrome';

export { isDev, reactDevtools, extDir };
