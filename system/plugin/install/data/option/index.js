module.exports = function (baseUrl, time) {
  return [
    {
      id: 1,
      name: "link",
      key: "link",
      value: JSON.stringify([
        {
          name: 'NodeAir',
          url: 'https://www.nodeair.com'
        }
      ]),
      create_time: time,
      update_time: time
    },
    {
      id: 2,
      name: "nav",
      key: "top",
      value: JSON.stringify([
        {
          name: '首页',
          openType: 2, // 1 新窗口打开 2 替换当前窗口
          url: baseUrl
        },
        {
          name: 'NodeAir',
          openType: 1, // 1 新窗口打开 2 替换当前窗口
          url: 'https://www.nodeair.com'
        }
      ]),
      create_time: time,
      update_time: time
    }
  ];
}
