'use strict';

const HOOK_NAMESPACE = 'system/plugin/app/controller/search';

module.exports = async function(ctx) {
  const { hook, theme } = this;
  const state = {
    data: {
      title: '搜索',
      text: '搜索结果',
    },
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 1,
    data: state.data,
    ctx,
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
};
