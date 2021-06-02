const CategoryData = require('../data/category');
const UploadData = require('../data/upload');
const PostData = require('../data/post/index');

async function insertController(ctx) {
  const { db } = this;
  const { models } = db.model;
  const { Post, Category, Upload } = models;
  const baseUrl = 'http://127.0.0.1:6688/';

  await Post.bulkCreate(PostData.call(this, baseUrl));
  await Category.bulkCreate(CategoryData.call(this, baseUrl));
  await Upload.bulkCreate(UploadData.call(this, baseUrl));
  // console.log('categoryData', categoryData);
  // console.log('uploadData', uploadData);
  ctx.body = {
    code: 0,
    msg: '插入模拟数据成功'
  }
}

module.exports = insertController;
