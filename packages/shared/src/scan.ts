import path from 'path';
import fg from 'fast-glob';

type FileMapping = (Raw: { fullPath: string; file: string }) => void;

/**
 * 扫描指定目录和文件
 *
 * @export
 * @param {string} workInDir
 * @param {string} [glob='*']
 * @param {FileMapping} [mapping=(val) => val]
 * @return {*}
 */
export async function scanFiles(
  workInDir: string,
  glob: string = '*',
  mapping: FileMapping = (val) => val
) {
  const files = await fg(`${workInDir}/${glob}`, {
    onlyFiles: true,
    ignore: ['node_modules/**/*'],
  });
  return files
    .map((file) => {
      return {
        fullPath: file,
        file: path.basename(file),
      };
    })
    .map(mapping);
}

type DirMapping = (Raw: { fullPath: string; dir: string }) => void;

/**
 * 扫码 dir
 *
 * @export
 * @param {string} workInDir
 * @param {DirMapping} [mapping=(val) => val]
 * @return {*}
 */
export async function scanDirs(
  workInDir: string,
  mapping: DirMapping = (val) => val
) {
  const dirs = await fg(`${workInDir}/*`, {
    onlyDirectories: true,
    ignore: ['node_modules/**/*'],
  });
  return dirs
    .map((dir) => {
      return {
        fullPath: dir,
        dir: path.basename(dir),
      };
    })
    .map(mapping);
}
