module.exports = function (base, time) {
  return [
    {
      id: 1,
      namespace: "system/plugin/app",
      key: "links",
      value: JSON.stringify([
        {
          name: 'NodeAir',
          url: 'https://www.nodeair.com'
        }
      ])
    },
    {
      id: 2,
      namespace: "system/plugin/app",
      key: "top-nav",
      value: JSON.stringify([
        {
          name: '首页',
          openType: 2, // 1 新窗口打开 2 替换当前窗口
          url: base
        },
        {
          name: 'NodeAir',
          openType: 1, // 1 新窗口打开 2 替换当前窗口
          url: 'https://www.nodeair.com'
        }
      ])
    }
  ];
}