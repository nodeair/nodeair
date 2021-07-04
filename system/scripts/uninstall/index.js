'use strict';

const steps = require('./steps');

/**
 * 卸载程序
 * 谨慎操作，会清空所有数据
 */
async function uninstall() {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const [ msg, fn ] = step;
    console.log('[uninstall]', msg);
    await fn.call(this);
  }
}

uninstall();

module.exports = uninstall;
