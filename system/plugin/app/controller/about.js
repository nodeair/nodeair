const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/archive';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const archives = await service.call(`${SERVICE_NAMESPACE}/archive`, 'getArchives', true);
  for (let i = 0; i < archives.length; i++) {
    const { year } = archives[i];
    archives[i].posts = await service.call(`${SERVICE_NAMESPACE}/archive`, 'getPostsByDate', year);
  }

  const state = {
    data: {
      list: archives
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 7,
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
}
