const namespace = 'system/plugin/app';

/**
 * 获取文章
 */
 async function getPosts(params = {}) {
  const { db } = this;
  const { pageNumber = 1, pageSize = 10 } = params;
  const { model } = db;
  const { models } = model;
  const { Post } = models;
  return Post.findAll({
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    raw: true
  });
}

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
  },
  {
    namespace,
    serviceName: 'getPosts',
    handler: getPosts
  }
];
