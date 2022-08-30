import randomstring from 'randomstring';

/**
 * 生成随机长度的字符串
 *
 * @export
 * @param {number} length
 * @return {*}
 */
export function string(length: number) {
  return randomstring.generate(length);
}
