'use strict';

const { DataTypes } = require('sequelize');
const { INTEGER, TINYINT, DATE, STRING, TEXT } = DataTypes;

/**
 * 评论表
 */
module.exports = function() {
  return {
    name: 'na_comment',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '评论的ID' },
      rootId: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '根评论的ID' },
      parentId: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '父评论的ID' },
      isChecking: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '评论是否处于审核中 0 否 1 是' },
      authorId: { type: INTEGER, allowNull: true, comment: '作者的ID' },
      authorName: { type: STRING(250), allowNull: true, comment: '作者的昵称' },
      authorEmail: { type: STRING(250), allowNull: true, comment: '作者的邮箱' },
      authorSite: { type: STRING(250), allowNull: true, comment: '作者的个人主页' },
      authorIp: { type: STRING(250), allowNull: true, comment: '作者的IP' },
      authorAgent: { type: TEXT, allowNull: true, comment: '作者的agent' },
      content: { type: TEXT, comment: '评论内容' },
      postTime: { type: DATE, comment: '评论发布时间' },
    },
  };
};
