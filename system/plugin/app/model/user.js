const { DataTypes } = require('sequelize');
const { INTEGER, TINYINT, STRING } = DataTypes

/**
 * 用户表
 */
function User(sequelize) {
  return sequelize.define('User', {
    id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '用户的ID' },
    status: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '用户状态 0 正常 1 禁止登录' },
    nickname: { type: STRING(250), allowNull: false, defaultValue: 'NodeAir用户', comment: '用户昵称' },
    username: { type: STRING(250), allowNull: false, comment: '用户名' },
    password: { type: STRING(250), allowNull: false, comment: '密码' },
    email: { type: STRING(250), allowNull: false, comment: '邮箱' },
    // create_time: {},
    // update_time: {}
  }, {
    freezeTableName: true
  });
}

module.exports = User;
