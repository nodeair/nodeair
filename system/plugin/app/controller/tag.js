const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/tag';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const { name } = ctx.params;
  const tag = await service.call(SERVICE_NAMESPACE, 'getTagByName', name);
  if (!tag) return;
  const posts = await service.call(SERVICE_NAMESPACE, 'getPosts', { tagId: tag.id });
  const state = {
    data: {
      title: `${tag.name}标签下的文章`,
      posts,
      tag
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 6,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
}
