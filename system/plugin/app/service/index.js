const namespace = 'system/plugin/app';

/**
 * 获取文章列表
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
 * 获取所有管理员
 */
async function getManagers() {
  const { db } = this;
  const { model } = db;
  const { models } = model;
  const { User } = models;
  return User.findAll({ where: { type: 0 }, raw: true });
}

/**
 * 获取分类列表
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
  },
  {
    namespace,
    serviceName: 'getManagers',
    handler: getManagers
  }
];
