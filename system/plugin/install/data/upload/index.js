module.exports = function (base, time) {
  return [{
    id: 1,
    authorId: 1,
    size: 212268,
    mimeType: 'image/jpeg',
    name: `${time}.jpg`,
    sourceName: `${time}.jpg`,
    storagePath: `${base}/upload/${time}.jpg`,
    intro: '第一篇文章的封面'
  }, {
    id: 2,
    authorId: 1,
    size: 33512,
    mimeType: 'image/png',
    name: `default_avatar.png`,
    sourceName: `default_avatar.png`,
    storagePath: `${base}/upload/default_avatar.png`,
    intro: '默认头像'
  }]
}
