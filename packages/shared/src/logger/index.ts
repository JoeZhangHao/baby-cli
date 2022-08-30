import signale from 'signale';
import ora from 'ora';
import os from 'os';
import chalk from 'chalk';
import terminal from 'terminal-kit';
import { downloadImg } from '../download';

const TIPS = 'baby-cli';

/**
 * 控制台打印方法
 *
 * @class Logger
 * @extends {signale.Signale}
 */
class Logger extends signale.Signale {
  constructor(scope = chalk.blueBright(TIPS)) {
    super({
      scope,
      types: {
        await: {
          badge: '🚗',
          color: 'blueBright',
          label: 'processing...',
        },
        star: {
          badge: '🍇',
          color: 'cyan',
          label: 'Json',
        },
        note: {
          badge: '🍎',
          color: 'cyan',
          label: 'Array',
        },
      },
    });
  }

  /**
   * 打印对象
   *
   * @param {Record<string, any>} data
   * @param {boolean} [log=true]
   * @return {*}
   * @memberof Logger
   */
  json(data: Record<string, any>, log = true) {
    const keys = Object.keys(data);

    let content = '';
    if (keys.length === 0) {
      content = 'empty';
    } else {
      content = Object.entries(data)
        .map((item, idx) => {
          const [key, value] = item;
          return `${idx + 1}. ${key} : ${chalk.green(value)}`;
        })
        // 换行符
        .join(os.EOL);
    }

    if (!log) return content;

    this.star(`${os.EOL}${content}`);
  }

  /**
   * 打印数组
   *
   * @param {any[]} arr
   * @param {string} [tips='']
   * @param {boolean} [log=true]
   * @return {*}
   * @memberof Logger
   */
  array(arr: any[], tips: string = '', log = true) {
    let content = '';

    if (arr.length === 0) {
      content = 'empty';
    } else {
      content = arr
        .map((it, idx) => `${idx + 1}. ${chalk.green(it)}`)
        .join(os.EOL);
    }

    if (!log) return content;

    this.note(`${tips}${os.EOL}${content}`);
  }

  /**
   * 打印图片
   *
   * @param {string} url
   * @return {*}
   * @memberof Logger
   */
  async img(url: string) {
    // 如果是远程地址，则先下载
    if (/^https?:\/\//.test(url)) {
      const localFile = await downloadImg(url);
      terminal.terminal.drawImage(localFile);
      return;
    }
    // 绘制到控制台
    terminal.terminal.drawImage(url);
  }

  /**
   * 等待
   *
   * @param {string} text
   * @return {*}
   * @memberof Logger
   */
  spin(text: string) {
    const spin = ora({
      text: text,
      color: 'gray',
    }).start();
    return spin;
  }
}

const logger = new Logger();

logger.config({
  // 禁用打印时间戳
  displayTimestamp: false,
});

export default logger;
