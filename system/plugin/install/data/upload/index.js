module.exports = function (base, time) {
  return [{
    id: 1,
    author_id: 1,
    size: 212268,
    mime_type: 'image/jpeg',
    name: `${time}.jpg`,
    source_name: `${time}.jpg`,
    storage_path: `${base}/upload/${time}.jpg`,
    intro: '第一篇文章的封面'
  }, {
    id: 2,
    author_id: 1,
    size: 33512,
    mime_type: 'image/png',
    name: `default_avatar.png`,
    source_name: `default_avatar.png`,
    storage_path: `${base}/upload/default_avatar.png`,
    intro: '默认头像'
  }]
}