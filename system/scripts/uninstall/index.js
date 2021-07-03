'use strict';

const steps = require('./steps');

/**
 * 卸载程序
 * 谨慎操作，会清空所有数据
 */
async function uninstall() {
  for (const key in steps) {
    if (steps.hasOwnProperty.call(steps, key)) {
      const fn = steps[key];
      console.log('[uninstall]', key);
      await fn.call(this);
    }
  }
}

uninstall();

module.exports = uninstall;
