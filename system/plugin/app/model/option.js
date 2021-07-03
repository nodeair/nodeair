'use strict';

const { DataTypes } = require('sequelize');
const { INTEGER, STRING, TEXT } = DataTypes;

/**
 * 配置表
 */
module.exports = function() {
  return {
    name: 'na_option',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '配置项的ID' },
      namespace: { type: STRING(250), allowNull: false, comment: '命名空间' },
      key: { type: STRING(250), allowNull: false, comment: '配置key' },
      value: { type: TEXT, allowNull: true, comment: '配置value' },
    },
  };
};
