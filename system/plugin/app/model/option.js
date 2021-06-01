const { DataTypes } = require('sequelize');
const { INTEGER, BIGINT, STRING, TEXT } = DataTypes;

/**
 * 配置表
 */
module.exports = function () {
  return {
    name: 'na_option',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '配置项的ID' },
      name: { type: STRING(250), allowNull: false, comment: '配置名称' },
      key: { type: STRING(250), allowNull: false, comment: '配置key' },
      value: { type: TEXT, allowNull: true, comment: '配置value' },
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    }
  };
};
