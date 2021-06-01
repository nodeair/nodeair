const { DataTypes } = require('sequelize');
const { INTEGER, BIGINT, STRING, BOOLEAN, TEXT } = DataTypes;

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
      is_checking: { type: BOOLEAN, allowNull: false, defaultValue: false, comment: '评论是否处于审核中' },
      author_id: { type: INTEGER, allowNull: true, comment: '作者的ID' },
      author_name: { type: STRING(250), allowNull: true, comment: '作者的昵称' },
      author_email: { type: STRING(250), allowNull: true, comment: '作者的邮箱' },
      author_site: { type: STRING(250), allowNull: true, comment: '作者的个人主页' },
      author_ip: { type: STRING(250), allowNull: true, comment: '作者的IP' },
      author_agent: { type: TEXT, allowNull: true, comment: '作者的agent' },
      content: { type: TEXT, comment: '评论内容' },
      post_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '文章发布时间' }, 
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    }
  };
};
