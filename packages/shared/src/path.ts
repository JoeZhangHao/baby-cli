import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件路径和所在的文件夹路径
export function getDirnameAndFilename() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return {
    __filename,
    __dirname,
  };
}

// 获取绝对路径
export function resolvePath(baseUrl: string) {
  return function (url: string) {
    return path.resolve(baseUrl, url);
  };
}

export const resolveDirname = resolvePath(getDirnameAndFilename().__dirname);
export const resolvePwd = resolvePath(process.cwd());

// 获取路径层级列表
export const separatePath = (p: string): string[] => {
  if (!p) return [];
  // 根据 path.sep 来拆分，兼容不同系统的路径规则
  return p.split(path.sep);
};
