const chalk = require('chalk');

/**
 * 日志类
 */
class Log {
  constructor(app) {
    this.app = app;
  }
  /**
   * 打印日志
   */
  print() {
    const { APP_NAME, config } = this.app;
    const { debug } = config;
    if (!debug) return;
    const time = new Date();
    const args = Array.prototype.slice.call(arguments, 0);
    const text = args.join(' ');
    console.log(chalk.green(`[${APP_NAME}] ${time}: ${text}`));
  }
  /**
   * 系统日志
   */
  system() {
    const { APP_NAME, config } = this.app;
    const { debug } = config;
    if (!debug) return;
    const time = new Date();
    const args = Array.prototype.slice.call(arguments, 0);
    const text = args.join(' ');
    console.log(chalk.yellow(`[${APP_NAME}] ${time}: ${text}`));
  }
}

module.exports = Log;
