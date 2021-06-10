const CategoryData = require('../data/category');
const PostData = require('../data/post/index');

async function insertController(ctx) {
  const packageJson = require('../package.json');
  if (packageJson.enable === false) {
    console.log('已禁用');
    return;
  }
  const { db, plugin } = this;
  const { models } = db.model;
  const { Post, Category, Upload } = models;
  
  const baseUrl = 'http://127.0.0.1:6688/';
  const postData = PostData.call(this, baseUrl);
  const { postList, uploadList } = postData;
  await Category.bulkCreate(CategoryData.call(this, baseUrl));
  await Post.bulkCreate(postList);
  await Upload.bulkCreate(uploadList);
  ctx.body = {
    code: 0,
    msg: '插入模拟数据成功'
  }
  // 禁用自己
  plugin.modifyConfig('@nodeair/plugin-mock', { enable: false });
}

module.exports = insertController;
