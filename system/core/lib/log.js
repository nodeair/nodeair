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
    const args = Array.from(arguments);
    return this._log.apply(this, ['green', ...args ]);
  }
  /**
   * 系统日志
   */
  system() {
    const args = Array.from(arguments);
    return this._log.apply(this, ['yellow', ...args ]);
  }
  /**
   * 打印
   */
  _log(type) {
    const { constant, config } = this.app;
    const { debug } = config;
    if (!debug) return;
    const time = new Date();
    const args = Array.from(arguments);
    args.shift();
    args.forEach((item, index) => {
      args[index] = typeof item === 'object' ? item.toString() : item;
    });
    const text = args.join(' ');
    console.log(chalk[type](`[${constant.APP_NAME}] ${time}: ${text}`));
  }
}

module.exports = Log;
