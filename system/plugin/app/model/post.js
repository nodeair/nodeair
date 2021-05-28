const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes

/**
 * 文章表
 */
function Post(sequelize) {
  return sequelize.define('Post', {
    id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '文章的ID' },
    title: { type: STRING(60), allowNull: false, comment: '文章的标题' },
  }, {
    freezeTableName: true
  });
}

module.exports = Post;
