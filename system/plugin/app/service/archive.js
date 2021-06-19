/**
 * 获取文章归档
 */
async function getArchives() {
  const { sequelize } = this.db;
  const { SELECT } = sequelize.QueryTypes
  const { Post } = this.db.model.models;
  const tableName = Post.getTableName();
  const postTimeField = 'post_time';
  const sql = `SELECT YEAR(${postTimeField}) AS 'year',
                MONTH(${postTimeField}) AS 'month',COUNT(*) AS 'count'
                FROM ${tableName} GROUP BY YEAR(${postTimeField}) DESC,
                MONTH(${postTimeField});`;
  return sequelize.query(sql, { type: SELECT });
}

module.exports = {
  getArchives
};
