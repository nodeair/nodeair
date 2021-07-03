'use strict';

const fs = require('fs-extra');
const path = require('path');
const { SERVICE_NAMESPACE } = require('../package.json').constant;

/**
 * 导出所有服务
 */
function getServices() {
  const array = [];
  const filenames = fs.readdirSync(__dirname);
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i];
    if (filename === 'index.js') continue;
    const name = filename.substring(0, filename.lastIndexOf('.'));
    const handlers = require(path.join(__dirname, filename));
    for (const serviceName in handlers) {
      if (Object.hasOwnProperty.call(handlers, serviceName)) {
        const handler = handlers[serviceName];
        array.push({ namespace: `${SERVICE_NAMESPACE}/${name}`, serviceName, handler });
      }
    }
  }
  return array;
}

// 导出服务
module.exports = getServices();
