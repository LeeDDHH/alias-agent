'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';

/**
 * React Devtools の場所を探す関数
 */
export const searchReactDevtools = async () => {
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

  // React Devtools フォルダの絶対パス
  const dirPath = path.join(os.homedir(), extDir, reactDevtools);

  return await fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift()
    )
    .catch((err) => console.log(`Error: ${err}`));
};
