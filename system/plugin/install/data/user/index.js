module.exports = function(base, time, user) {
  return {
    id: 1,
    name: 'nodeair',
    nickname: user.nickname,
    avatar: `${base}/upload/default_avatar.png`,
    intro: '这个人很懒，什么都没有写。',
    address: '太阳系，地球，中国',
    site: base,
    username: user.username,
    password: user.password
  }
}
