module.exports = function(baseUrl, time) {
  return {
    id: 1,
    author_id: 1,
    size: 212268,
    mime_type: 'image/jpeg',
    name: `${time}.jpg`,
    source_name: `${time}.jpg`,
    storage_path: `${baseUrl}upload/${time}.jpg`,
    intro: '第一篇文章的封面',
    create_time: time,
    update_time: time
  }
}
