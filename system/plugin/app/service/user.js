/**
 * 获取所有管理员
 */
async function getManagers() {
  const { User } = this.db.model.models;
  return User.findAll({ where: { type: 0 }, raw: true });
}

module.exports = {
  getManagers
};
