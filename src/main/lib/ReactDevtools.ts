'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';

import { session } from 'electron';

import { reactDevtools, extDir } from './Const';

// React Devtools の場所を探す関数
const searchReactDevtools = async () => {
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

// React Devtools を起動する関数
export const bootReactDevtools = async () => {
  const extPath = await searchReactDevtools();
  if (extPath) {
    await session.defaultSession
      .loadExtension(extPath, {
        allowFileAccess: true,
      })
      .then(() => console.log('React Devtools loaded...'))
      .catch((err) => console.log(err));
  }
};
