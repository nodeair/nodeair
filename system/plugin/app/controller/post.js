'use strict';

const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/post';

module.exports = async function(ctx) {
  const { hook, theme, service } = this;
  const { id } = ctx.params;
  const post = await service.call(`${SERVICE_NAMESPACE}/post`, 'getPost', { id });
  const neighbor = await service.call(`${SERVICE_NAMESPACE}/post`, 'getPostNeighbor', id);
  const tags = await service.call(`${SERVICE_NAMESPACE}/tag`, 'getTagsByIds', post.tags.split(','));

  const state = {
    data: {
      post,
      tags,
      prev: '',
      next: '',
    },
  };
  if (neighbor.length === 1) {
    const item = neighbor[0];
    if (item.id < id) {
      state.data.prev = item;
    } else {
      state.data.next = item;
    }
  } else if (neighbor.length === 2) {
    state.data.prev = neighbor[0];
    state.data.next = neighbor[1];
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  const renderParams = {
    pageId: 3,
    data: state.data,
    ctx,
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  return await theme.render(renderParams);
};
