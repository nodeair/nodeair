'use strict';

const Sequelize = require('sequelize');

/**
 * 获取单个标签
 * @param {Object} params 参数
 */
async function getTag(params = {}) {
  const { Tag } = this.db.model.models;
  const { id } = params;
  return Tag.findOne({
    where: { id },
    raw: true,
  });
}
/**
 * 通过标签名称获取单个标签
 * @param {String} name 标签名称
 */
async function getTagByName(name) {
  const { Tag } = this.db.model.models;
  return Tag.findOne({
    where: { name },
    raw: true,
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
/**
 * 获取标签通过ids
 * @param {Array<Number>} ids ids
 */
async function getTagsByIds(ids) {
  const { Tag } = this.db.model.models;
  return Tag.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: ids,
      },
    },
    raw: true,
  });
}

module.exports = {
  getTag,
  getTagByName,
  getTags,
  getTagCount,
  getTagsByIds,
};
