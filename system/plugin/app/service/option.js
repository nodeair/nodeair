'use strict';

const { SERVICE_NAMESPACE } = require('../package.json').constant;

/**
 * 获取数据库中的配置信息
 */
async function getOption(params = {}) {
  const { key, namespace = SERVICE_NAMESPACE } = params;
  const { Option } = this.db.model.models;
  const item = await Option.findOne({ where: { namespace, key }, raw: true });
  try {
    const json = JSON.parse(item.value);
    return json;
  } catch (e) {
    return {};
  }
}

module.exports = {
  getOption,
};
