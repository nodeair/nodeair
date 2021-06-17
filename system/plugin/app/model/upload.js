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
      authorId: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '作者的ID' },
      size: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '附件大小' },
      mimeType: { type: STRING(250), allowNull: false, comment: '附件的mime类型' },
      name: { type: STRING(250), allowNull: false, comment: '附件名称' },
      sourceName: { type: STRING(250), allowNull: false, comment: '原始文件名' },
      storagePath: { type: STRING(250), allowNull: false, comment: '存储相对位置' },
      intro: { type: TEXT, comment: '附件简介' }
    }
  };
};
