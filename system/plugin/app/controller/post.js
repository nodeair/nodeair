const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/post';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const { id } = ctx.params;
  const post = await service.call(SERVICE_NAMESPACE, 'getPost', { id });
  const state = {
    data: {
      post
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 3,
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
}
