import { ESLint } from 'eslint';

/**
 * 根据指定的 eslint 配置文件,输出格式化后的代码
 *
 * @export
 * @param {string} filePath
 */
export async function formate(filePath: string) {
  const eslint = new ESLint({
    fix: true,
  });
  const result = await eslint.lintFiles(filePath);
  await ESLint.outputFixes(result);
}
