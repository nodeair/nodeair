const moment = require('moment');

module.exports = function (base, time, user) {
  return {
    id: 1,
    author_id: 1,
    author_name: user.nickname,
    author_email: '',
    author_site: base,
    author_ip: '127.0.0.1',
    author_agent: '',
    content: '这是你的第一条评论，你可以删除或者修改它',
    post_time: moment(time).format('YYYY-MM-DD HH:mm:ss')
  };
};
