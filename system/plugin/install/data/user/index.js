module.exports = function(base, time, user) {
  return {
    id: 1,
    name: "nodeair",
    nickname: user.nickname,
    avatar: `${base}upload/default_avatar.png`,
    username: user.username,
    password: user.password,
    create_time: time,
    update_time: time
  }
}
