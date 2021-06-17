const Pagination = require('../pagination');
const { SERVICE_NAMESPACE } = require('../package.json').constant;
const HOOK_NAMESPACE = 'system/plugin/app/controller/category';

module.exports = async function (ctx) {
  const { hook, theme, service } = this;
  const id = Number(ctx.params.id) || 1;
  const pageNumber = Number(ctx.params.pageNumber) || 1;
  const pagination = new Pagination({ pageNumber });
  const category = await service.call(SERVICE_NAMESPACE, 'getCategory', { id });
  const posts = await service.call(SERVICE_NAMESPACE, 'getPosts', { pageNumber, categoryId: id });

  const state = {
    data: {
      title: `${category.name}分类下的文章`,
      posts,
      category,
      pagination
    }
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 处理分页
  pagination.count = await service.call('system/plugin/app', 'getPostCount', { categoryId: id });
  pagination.pages = Math.ceil(pagination.count / pagination.pageSize);
  pagination.initUrl();

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, state);

  // 构建渲染数据
  const renderParams = {
    pageId: 5,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 3, renderParams);

  // 返回
  return await theme.render(renderParams);
}
