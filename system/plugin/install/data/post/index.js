const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = function(base, time) {
  const htmlPath = path.join(__dirname, 'post.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  return {
    id: 1,
    title: "欢迎使用 NodeAir 搭建你的网站，你可以编辑或删除这篇文章。",
    poster: `${base}/upload/${time}.jpg`,
    category_id: 1,
    author_id: 1,
    summary: "欢迎使用 NodeAir 搭建你的网站，你可以编辑或删除这篇文章。",
    content_html: content,
    post_time: moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
}
