/**
 * 获取分类列表
 */
async function getAllCategories() {
  const { Category } = this.db.model.models;
  return Category.findAll({ raw: true });
}
/**
 * 获取单个分类
 */
async function getCategory(params = {}) {
  const { Category } = this.db.model.models;
  const { id } = params;
  return Category.findOne({
    where: { id },
    raw: true
  });
}
/**
 * 获取分类总数
 */
async function getCateCount() {
  const { Category } = this.db.model.models;
  return Category.count();
};

module.exports = {
  getAllCategories,
  getCategory,
  getCateCount
};
