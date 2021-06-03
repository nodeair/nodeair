const path = require('path');
const fs = require('fs-extra');
const CategoryData = require('../../../data/category');
const UserData = require('../../../data/user');
const PostData = require('../../../data/post');

/**
 * 插入初始数据
 */
 async function insertData(params) {
  const { db, config, constant } = this;
  const { UPLOAD_DIR } = constant;
  const { base } = config.site;
  const { model } = db;
  const { Category, Comment, Option, Post, Tag, Upload, User } = model.models;
  const time = new Date().getTime();
  // 处理 upload 中的文件
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirsSync(UPLOAD_DIR);
  }
  const uploadDir = path.join(__dirname, '../../../upload');
  const defaultAvatar = {
    origin: path.join(uploadDir, 'default_avatar.png'),
    target: path.join(UPLOAD_DIR, 'default_avatar.png')
  };
  const posterPath = {
    origin: path.join(uploadDir, 'poster.jpg'),
    target: path.join(UPLOAD_DIR, `${time}.jpg`)
  };
  fs.copyFileSync(defaultAvatar.origin, defaultAvatar.target);
  fs.copyFileSync(posterPath.origin, posterPath.target);
  const user = {
    nickname: params.manager.nickname,
    username: params.manager.username,
    password: params.manager.password
  }
  await Category.create(CategoryData(time));
  await User.create(UserData(base, time, user));
  await Post.create(PostData(base, time));
}

module.exports = insertData;
