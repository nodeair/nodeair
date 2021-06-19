/**
 * 获取单个标签
 */
async function getTag(params = {}) {
  const { Tag } = this.db.model.models;
  const { id } = params;
  return Tag.findOne({
    where: { id },
    raw: true
  });
}
/**
 * 通过标签名称获取单个标签
 */
async function getTagByName(name) {
  const { Tag } = this.db.model.models;
  return Tag.findOne({
    where: { name },
    raw: true
  });
}
/**
 * 获取标签列表
 */
async function getTags() {
  const { Tag } = this.db.model.models;
  return Tag.findAll({ raw: true });
}
/**
 * 获取标签总数
 */
async function getTagCount() {
  const { Tag } = this.db.model.models;
  return Tag.count();
}

module.exports = {
  getTag,
  getTagByName,
  getTags,
  getTagCount
};
