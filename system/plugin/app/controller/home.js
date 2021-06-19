const Pagination = require('../pagination');
const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/home';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const pageNumber = Number(ctx.params.pageNumber) || 1;
  const pagination = new Pagination({ pageNumber });

  const state = {
    data: {
      title: '首页',
      posts: [],
      pagination
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 处理分页
  state.data.posts = await service.call(`${SERVICE_NAMESPACE}/post`, 'getPosts', { pageNumber });
  pagination.count = await service.call(`${SERVICE_NAMESPACE}/post`, 'getPostCount');
  pagination.pages = Math.ceil(pagination.count / pagination.pageSize);
  pagination.initUrl();

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, state);

  // 构建渲染数据
  const renderParams = {
    pageId: 0,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 3, renderParams);

  // 返回
  return await theme.render(renderParams);
}
