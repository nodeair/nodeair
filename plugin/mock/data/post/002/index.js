const fs = require('fs-extra');
const path = require('path');

// https://36kr.com/p/1250893844065792
module.exports = function(base, time) {
  const htmlPath = path.join(__dirname, 'post.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  content = content.replace(/\{baseUrl\}/g, base);
  return {
    title: "美国供应链平台运营商「Project44」获得2亿美元E轮投资，估值达12亿美元",
    poster: `${base}upload/1622624672000.png`,
    category_id: 3, // 创投新闻
    author_id: 1,
    summary: "这可能是供应链可视化平台中最大的一笔投资。",
    content_html: content,
    post_time: time,
    create_time: time,
    update_time: time
  }
}
