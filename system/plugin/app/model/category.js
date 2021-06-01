const { DataTypes } = require('sequelize');
const { INTEGER, BIGINT, STRING, TEXT } = DataTypes;

/**
 * 分类表
 */
module.exports = function () {
  return {
    name: 'na_category',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '分类的ID' },
      name: { type: STRING(250), allowNull: false, comment: '分类名称' },
      order: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '分类排序' },
      description: { type: TEXT, allowNull: false, comment: '分类描述'},
      meta: { type: TEXT, defaultValue: '{}', comment: '网页meta信息'},
      count: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '分类被引用次数' },
      template: { type: STRING(200), defaultValue: 'category', comment: '所使用的模板名称' },
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    }
  }
}
