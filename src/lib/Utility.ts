import * as fs from 'fs-extra';

const isExistFile = (filePath: string): boolean => {
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

const makeDirIfNotExists = async (dirPath: string): Promise<boolean> => {
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

const makeFileIfNotExists = async (
  filePath: string,
  data: object
): Promise<boolean> => {
  if (!isExistFile(filePath)) return await writeSync(filePath, data);
  return true;
};

const writeSync = async <T>(filePath: string, data: T): Promise<boolean> => {
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

const readJsonFile = async (filePath: string): Promise<any | null> => {
  let content;
  try {
    content = await fs.promises.readFile(filePath, 'utf-8');
    const result = JSON.parse(content);
    return result;
  } catch (e) {
    console.log('read file failed: ' + e);
    return null;
  }
};

export {
  isExistFile,
  makeDirIfNotExists,
  makeFileIfNotExists,
  writeSync,
  readJsonFile,
};
