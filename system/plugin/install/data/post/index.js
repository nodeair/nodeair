'use strict';

const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = function(base, time, posterFileName) {
  const htmlPath = path.join(__dirname, 'post.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  return {
    id: 1,
    title: '欢迎使用 NodeAir 搭建你的网站，你可以编辑或删除这篇文章。',
    poster: `${base}/upload/${posterFileName}.jpg`,
    categoryId: 1,
    authorId: 1,
    summary: '欢迎使用 NodeAir 搭建你的网站，你可以编辑或删除这篇文章。',
    tags: '1',
    contentHtml: content,
    postTime: moment(time).format('YYYY-MM-DD HH:mm:ss'),
  };
};
