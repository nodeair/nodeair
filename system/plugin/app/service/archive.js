/**
 * 获取文章归档
 */
async function getArchives(onlyYear = false) {
  const { sequelize } = this.db;
  const { SELECT } = sequelize.QueryTypes
  const { Post } = this.db.model.models;
  const tableName = Post.getTableName();
  const timeField = 'post_time';
  let sql = '';
  if (onlyYear) {
    sql = `SELECT YEAR(${timeField}) AS 'year', COUNT(*) AS 'count' FROM ${tableName} GROUP BY YEAR(${timeField})`;
  } else {
    sql = `SELECT YEAR(${timeField}) AS 'year',
                MONTH(${timeField}) AS 'month',COUNT(*) AS 'count'
                FROM ${tableName} GROUP BY YEAR(${timeField}) DESC,
                MONTH(${timeField});`;
  }
  return sequelize.query(sql, { type: SELECT });
}

/**
 * 获取某个日期的所有文章
 */
async function getPostsByDate(date = '') {
  const { sequelize, log } = this.db;
  const { SELECT } = sequelize.QueryTypes
  const { Post } = this.db.model.models;
  const tableName = Post.getTableName();
  const timeField = 'post_time';
  const tempArr = String(date).split('-');
  if (!tempArr) return log.system.warn('参数格式不正确');
  let sql = '';
  switch (tempArr.length) {
    case 1:
      sql = `select * from ${tableName} where YEAR(${timeField})=YEAR('${date}-01-01') ORDER BY ${timeField} DESC`;
      break;
    case 2:
      sql = `SELECT * FROM ${tableName} WHERE DATEDIFF(${timeField}, '${date}') < 30 AND DATEDIFF(${timeField}, '${date}') >= 0 ORDER BY ${timeField} DESC`;
      break;
    case 0:
    default:
      return log.system.warn('参数格式不正确');
  }
  return sequelize.query(sql, { type: SELECT });
}

module.exports = {
  getArchives,
  getPostsByDate
};
