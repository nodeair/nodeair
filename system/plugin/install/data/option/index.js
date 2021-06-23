const { SERVICE_NAMESPACE } = require('../../../app/package.json').constant;

module.exports = function (base, time) {
  return [
    {
      id: 1,
      namespace: SERVICE_NAMESPACE,
      key: 'links',
      value: JSON.stringify([
        {
          name: 'NodeAir',
          url: 'https://www.nodeair.com'
        }
      ])
    },
    {
      id: 2,
      namespace: SERVICE_NAMESPACE,
      key: 'top-nav',
      value: JSON.stringify([
        {
          name: '首页',
          openType: 2, // 1 新窗口打开 2 替换当前窗口
          url: base
        },
        {
          name: '归档',
          openType: 2, // 归档
          url: `${base}/archive`
        },
        {
          name: '关于',
          openType: 2, // 关于
          url: `${base}/about`,
        },
        {
          name: 'NodeAir',
          openType: 1, // 1 新窗口打开 2 替换当前窗口
          url: 'https://www.nodeair.com'
        }
      ])
    },
    {
      id: 3,
      namespace: SERVICE_NAMESPACE,
      key: 'pages',
      value: JSON.stringify({
        about: '<h2>关于页面</h2>'
      })
    }
  ];
}
