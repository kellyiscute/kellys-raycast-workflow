import fs from "fs";
import { join } from "path";
const { promises: fsPromise } = fs;

export interface IScannedRepos {
  name: string;
  path: string;
}

export async function scanRepos(dirs: string[]): Promise<IScannedRepos[]> {
  const result: IScannedRepos[] = [];

  for (const path of dirs) {
    const dir = await fsPromise.opendir(path);
    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        const scanningPath = join(path, dirent.name);
        if ((await fsPromise.readdir(scanningPath)).includes(".git")) {
          result.push({
            path: scanningPath,
            name: dirent.name,
          })
        }
      }
    }
  }

  return result;
}

