const namespace = 'system/plugin/app';

const handlers = {
  /**
   * 获取单个文章
   */
  async getPost(params = {}) {
    const { Post } = this.db.model.models;
    const { id } = params;
    return Post.findOne({
      where: { id },
      raw: true
    });
  },
  /**
   * 获取文章列表
   */
  async getPosts(params = {}) {
    const { Post } = this.db.model.models;
    const { pageNumber = 1, pageSize = 10, order = '' } = params;
    return Post.findAll({
      order,
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      raw: true
    });
  },
  /**
   * 获取文章总数
   */
  async getPostCount() {
    const { Post } = this.db.model.models;
    return Post.count();
  },
  /**
   * 获取所有管理员
   */
  async getManagers() {
    const { User } = this.db.model.models;
    return User.findAll({ where: { type: 0 }, raw: true });
  },
  /**
   * 获取分类列表
   */
  async getAllCategories() {
    const { Category } = this.db.model.models;
    return Category.findAll({ raw: true });
  },
  /**
   * 获取分类总数
   */
   async getCateCount() {
    const { Category } = this.db.model.models;
    return Category.count();
  },
  /**
   * 获取标签列表
   */
  async getTags() {
    const { Tag } = this.db.model.models;
    return Tag.findAll({ raw: true });
  },
  /**
   * 获取标签总数
   */
  async getTagCount() {
    const { Tag } = this.db.model.models;
    return Tag.count();
  },
  /**
   * 获取数据库中的配置信息
   */
  async getOption(params = {}) {
    const { key, namespace = 'system/plugin/app' } = params;
    const { Option } = this.db.model.models;
    const item = await Option.findOne({ where: { namespace, key }, raw: true });
    try {
      const json = JSON.parse(item.value);
      return json;
    } catch (e) {
      return {};
    }
  },
  /**
   * 获取文章归档
   */
  async getArchives() {
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
}

// 导出服务
module.exports = (() => {
  const array = [];
  for (const serviceName in handlers) {
    if (Object.hasOwnProperty.call(handlers, serviceName)) {
      const handler = handlers[serviceName];
      array.push({ namespace, serviceName, handler });
    }
  }
  return array;
})();
