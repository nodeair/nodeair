/**
 * 初始化顶部导航高亮
 */
function initTopNav() {
  console.log('initTopNav');
  const cUrl = window.location.href;
  const els = $('.navbar-menu .navbar-item');
  $(els).each(function (index, el) {
    const href = $(el).attr('href');
    if (href === cUrl.substr(0, cUrl.length - 1)) {
      $(el).addClass('is-active');
    } else if (href === cUrl) {
      $(el).addClass('is-active');
    }
  });
}

export default initTopNav;
