const fs = require('fs-extra');
const path = require('path');

// https://36kr.com/p/1249852875294976
module.exports = function(base, time) {
  const htmlPath = path.join(__dirname, 'post.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  content = content.replace(/\{baseUrl\}/g, base);
  return {
    title: `拆解在线问诊：3大误区，3重真相，3副解药`,
    poster: `${base}upload/1622623210000.jpg`,
    category_id: 2, // 医疗服务
    author_id: 1,
    summary: "让服务归服务，生态归生态。",
    content_html: content,
    post_time: time,
    create_time: time,
    update_time: time
  }
}
