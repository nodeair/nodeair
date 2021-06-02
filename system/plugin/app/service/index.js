const namespace = 'system/plugin/app';

/**
 * 获取所有分类
 */
async function getAllCategories() {
  const { db } = this;
  const { model } = db;
  const { models } = model;
  const { Category } = models;
  return Category.findAll({ raw: true });
}

module.exports = [
  {
    namespace,
    serviceName: 'getAllCategories',
    handler: getAllCategories
  }
];
