const path = require('path');
const fs = require('fs-extra');

/**
 * 卸载程序
 */
async function uninstall() {
  const dataPath = path.resolve('data');
  const userConfigPath = path.resolve('nodeair.config.json');
  fs.removeSync(dataPath);
  fs.writeFileSync(userConfigPath, '{}', 'utf8');
  console.log('卸载完成');
}

uninstall();

module.exports = uninstall;
