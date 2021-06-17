const moment = require('moment');

module.exports = function (base, time, user) {
  return {
    id: 1,
    authorId: 1,
    authorName: user.nickname,
    authorEmail: '',
    authorSite: base,
    authorIp: '127.0.0.1',
    authorAgent: '',
    content: '这是你的第一条评论，你可以删除或者修改它',
    postTime: moment(time).format('YYYY-MM-DD HH:mm:ss')
  };
};
