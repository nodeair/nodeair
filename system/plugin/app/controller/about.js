const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/about';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const pages = await service.call(`${SERVICE_NAMESPACE}/option`, 'getOption', { key: 'pages' });
  const state = {
    data: {
      html: pages.about
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 8,
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
}
