const { DataTypes } = require('sequelize');
const { INTEGER, BIGINT, TINYINT, STRING, TEXT } = DataTypes;

/**
 * 用户表
 */
module.exports = function() {
  const { util } = this;
  return {
    name: 'na_user',
    structure: {
      id: { type: INTEGER, primaryKey: true, unique: true, autoIncrement: true, comment: '用户的ID' },
      status: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '用户状态 0 正常 1 禁止登录' },
      type: { type: TINYINT(4), allowNull: false, defaultValue: 0, comment: '用户类型 0 系统管理员 2 普通用户' },
      nickname: { type: STRING(250), allowNull: false, defaultValue: 'NodeAir用户', comment: '用户昵称' },
      avatar: { type: STRING(250), comment: '头像地址' },
      username: { type: STRING(250), allowNull: false, comment: '用户名' },
      password: { type: STRING(250), allowNull: false, comment: '密码' },
      email: { type: STRING(250), comment: '邮箱' },
      meta: { type: TEXT, defaultValue: '{}', comment: '网页meta信息'},
      template: { type: STRING(200), defaultValue: 'user', comment: '所使用的模板名称' },
      create_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据创建时间' },
      update_time: { type: BIGINT(20), allowNull: false, defaultValue: 0, comment: '数据更新时间' }
    },
    options: {
      hooks: {
        beforeCreate(user) {
          const hashedPassword = util.hashPassword(user.password);
          user.password = hashedPassword;
        }
      }
    }
  };
};
