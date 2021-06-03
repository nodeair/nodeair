module.exports = function (time, author) {
  return {
    id: 1,
    author_id: 1,
    author_name: author.nickname,
    author_email: '',
    author_site: '',
    author_ip: '127.0.0.1',
    author_agent: '',
    content: '这是你的第一条评论，你可以删除或者修改它',
    post_time: time,
    create_time: time,
    update_time: time
  };
};
