const { DataTypes } = require('sequelize');
const { INTEGER, TINYINT, BIGINT, STRING, TEXT } = DataTypes;

/**
 * 文章表
 */
module.exports = function() {
  return {
    name: 'na_post',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '文章的ID' },
      status: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '用户状态 0 正常 1 禁止查看' },
      is_top: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '文章是否置顶 0 否 1 是' },
      is_lock: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '文章是否禁止评论 0 否 1 是' },
      title: { type: STRING(60), allowNull: false, comment: '文章的标题' },
      summary: { type: STRING(200), allowNull: true, comment: '文章的摘要' },
      poster: { type: STRING(250), allowNull: true, comment: '文章的封面图片地址（选填）' },
      category_id: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '分类的ID' },
      author_id: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '作者的ID' },
      content_type: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '内容类型 0 HTML（富文本） 1（markdwon）' },
      content_html: { type: TEXT, comment: '文章内容（html类型）' },
      stat_view: { type: INTEGER, defaultValue: 0, comment: '文章浏览数' },
      stat_comment: { type: INTEGER, defaultValue: 0, comment: '文章被评论数' },
      meta: { type: TEXT, defaultValue: '{}', comment: '网页meta信息'},
      template: { type: STRING(200), defaultValue: 'post', comment: '所使用的模板名称' },
      post_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '文章发布时间' }, 
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    }
  };
};
