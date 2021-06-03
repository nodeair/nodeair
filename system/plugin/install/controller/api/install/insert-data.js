const path = require('path');
const fs = require('fs-extra');

const CategoryData = require('../../../data/category');
const UserData = require('../../../data/user');
const PostData = require('../../../data/post');
const OptionData = require('../../../data/option');
const TagData = require('../../../data/tag');
const CommentData = require('../../../data/comment');
const UploadData = require('../../../data/upload');

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
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirsSync(UPLOAD_DIR);
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
  };
  const results = [
    Comment.create(CommentData(base, time, user)),
    Category.create(CategoryData(time)),
    User.create(UserData(base, time, user)),
    Post.create(PostData(base, time)),
    Tag.create(TagData(time)),
    Option.bulkCreate(OptionData(base, time)),
    Upload.bulkCreate(UploadData(base, time))
  ];
  await Promise.all(results);
}

module.exports = insertData;
