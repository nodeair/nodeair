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

/**
 * 获取某篇文章的上下两篇
 */
async function getPostNeighbor(id) {
  const { sequelize } = this.db;
  const { SELECT } = sequelize.QueryTypes
  const { Post } = this.db.model.models;
  const tableName = Post.getTableName();
  const sql = `select * from ${tableName} where id in((select max(id) from ${tableName} where id < ${id}),
  (select min(id) from ${tableName} where id > ${id}))`;
  return sequelize.query(sql, { type: SELECT });
}

module.exports = {
  getPost,
  getPosts,
  getPostCount,
  getPostNeighbor
};
