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
    const args = Array.prototype.slice.call(arguments, 0);
    return this._log.apply(this, ['green', ...args ]);
  }
  /**
   * 系统日志
   */
  system() {
    const args = Array.prototype.slice.call(arguments, 0);
    return this._log.apply(this, ['yellow', ...args ]);
  }
  /**
   * 打印
   */
  _log(type) {
    const { APP_NAME, config } = this.app;
    const { debug } = config;
    if (!debug) return;
    const time = new Date();
    const args = Array.prototype.slice.call(arguments, 1);
    args.forEach((item, index) => {
      args[index] = typeof item === 'object' ? JSON.stringify(item, null, 2) : item;
    });
    const text = args.join(' ');
    console.log(chalk[type](`[${APP_NAME}] ${time}: ${text}`));
  }
}

module.exports = Log;
