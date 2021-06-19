/**
 * 获取单个文章
 */
async function getPost(params = {}) {
  const { Post } = this.db.model.models;
  const { id } = params;
  return Post.findOne({
    where: { id },
    raw: true
  });
}
/**
 * 获取文章列表
 */
async function getPosts(params = {}) {
  const { sequelize } = this.db;
  const { Post } = this.db.model.models;
  const { pageNumber = 1, pageSize = 10, order = '', categoryId = '', tagId = '' } = params;
  let where = {};
  if (tagId) where = sequelize.fn('FIND_IN_SET', tagId, sequelize.col('tags'));
  if (categoryId) where.categoryId = categoryId;
  return Post.findAll({
    where,
    order,
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    raw: true
  });
}
/**
 * 获取文章总数
 */
async function getPostCount(where = {}) {
  const { Post } = this.db.model.models;
  return Post.count({ where });
}

module.exports = {
  getPost,
  getPosts,
  getPostCount
};
