const { DataTypes } = require('sequelize');
const { INTEGER, BIGINT, STRING, TEXT } = DataTypes;

/**
 * 附件表
 */
module.exports = function() {
  return {
    name: 'na_upload',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '附件的ID' },
      author_id: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '作者的ID' },
      size: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '附件大小' },
      mime_type: { type: STRING(250), allowNull: false, comment: '附件的mime类型' },
      name: { type: STRING(250), allowNull: false, comment: '附件名称' },
      source_name: { type: STRING(250), allowNull: false, comment: '原始文件名' },
      storage_path: { type: STRING(250), allowNull: false, comment: '存储相对位置' },
      intro: { type: TEXT, comment: '附件简介' },
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    }
  };
};
