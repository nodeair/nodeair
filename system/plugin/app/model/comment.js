const { DataTypes } = require('sequelize');
const { INTEGER, TINYINT, DATE, STRING, TEXT } = DataTypes;

/**
 * 评论表
 */
module.exports = function () {
  return {
    name: 'na_comment',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '评论的ID' },
      root_id: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '根评论的ID' },
      parent_id: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '父评论的ID' },
      is_checking: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '评论是否处于审核中 0 否 1 是' },
      author_id: { type: INTEGER, allowNull: true, comment: '作者的ID' },
      author_name: { type: STRING(250), allowNull: true, comment: '作者的昵称' },
      author_email: { type: STRING(250), allowNull: true, comment: '作者的邮箱' },
      author_site: { type: STRING(250), allowNull: true, comment: '作者的个人主页' },
      author_ip: { type: STRING(250), allowNull: true, comment: '作者的IP' },
      author_agent: { type: TEXT, allowNull: true, comment: '作者的agent' },
      content: { type: TEXT, comment: '评论内容' },
      post_time: { type: DATE, comment: '评论发布时间' }
    }
  };
};
