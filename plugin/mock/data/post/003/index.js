const fs = require('fs-extra');
const path = require('path');

// https://36kr.com/p/1250869469097730
module.exports = function(base, time) {
  const htmlPath = path.join(__dirname, 'post.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  content = content.replace(/\{baseUrl\}/g, base);
  return {
    title: "为什么中国电动车出海首选挪威？",
    poster: `${base}upload/1622624904000.png`,
    category_id: 4, // 新能源车
    author_id: 1,
    summary: "3个电动车出海首选挪威的理由。",
    content_html: content,
    post_time: time,
    create_time: time,
    update_time: time
  }
}
