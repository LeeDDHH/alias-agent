'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

import { session } from 'electron';

import { reactDevtools, extDir } from '../../../lib/Const';

// React Devtools の場所を探す関数
const searchReactDevtools = async (): Promise<string | void | undefined> => {
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

// react developer toolsがローカルにない場合、インストールする
const installDevExtension = async (): Promise<void> => {
  await installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

// React Devtools を起動する関数
export const bootReactDevtools = async (): Promise<void> => {
  const extPath = await searchReactDevtools();
  if (!extPath) {
    installDevExtension();
    bootReactDevtools();
  } else {
    await session.defaultSession
      .loadExtension(extPath, {
        allowFileAccess: true,
      })
      .then(() => console.log('React Devtools loaded...'))
      .catch((err) => console.log(err));
  }
};
