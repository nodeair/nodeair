const PostData = require('../data/post/index');

async function insertController(ctx) {
  const packageJson = require('../package.json');
  if (packageJson.enable === false) {
    console.log('已禁用');
    return;
  }
  const { db, plugin } = this;
  const { models } = db.model;
  const { Post, Category, Tag, Upload } = models;
  
  const baseUrl = 'http://127.0.0.1:6688/';
  const postData = PostData.call(this, baseUrl);
  const { postList, uploadList } = postData;
  for (let i = 0; i < postList.length; i++) {
    const post = postList[i];
    const findCategory = await Category.findOne({ where: { name: post.categoryId }, raw: true });
    const category = findCategory ? findCategory : await Category.create({
      name: post.categoryId,
      count: 1
    });
    post.categoryId = category.id;
    const findTag = await Tag.findOne({ where: { name: post.tags }, raw: true });
    const tag = findTag ? findTag : await Tag.create({
      name: post.tags,
      count: 1
    });
    post.tags = tag.id;
  }
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
