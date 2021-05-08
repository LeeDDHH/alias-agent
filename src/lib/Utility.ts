import * as fs from 'fs-extra';

const isExistFile = (filePath: string) => {
  try {
    fs.statSync(filePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('file is not exists');
    }
    return false;
  }
  return true;
};

const makeDirIfNotExists = async (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
      return true;
    } catch (e) {
      console.log('mkdir failed: ' + e);
      return false;
    }
  }
  return true;
};

const makeFileIfNotExists = async (filePath: string, data: object) => {
  if (!isExistFile(filePath)) return await writeSync(filePath, data);
};

const writeSync = async (filePath: string, data: object) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
    });
  } catch (e) {
    console.log('write file failed: ' + e);
    return false;
  }
  return true;
};

const readJsonFile = async (filePath: string) => {
  let content;
  try {
    content = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.log('read file failed: ' + e);
    return null;
  }
};

export { isExistFile, makeDirIfNotExists, makeFileIfNotExists, readJsonFile };
