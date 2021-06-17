/**
 * 分页类
 */
class Pagination {
  constructor(options = {}) {
    this.routePrefix = options.routePrefix || '/page/';
    this.pageSize = options.pageSize || 10;
    this.pageNumber = options.pageNumber || 1;
    this.count = options.pageNumber || 0;
    this.pages = options.pages || 1;
    this.prevUrl = '';
    this.nextUrl = '';
  }
  /**
   * 初始化Url
   */
  initUrl() {
    const { pages, routePrefix, pageNumber } = this;
    const nextUrl = `${routePrefix}${pageNumber+1}`;
    const prevUrl = `${routePrefix}${pageNumber-1}`;
    if (pageNumber <= 1) {
      this.prevUrl = '';
      this.nextUrl = nextUrl;
    } else if (pageNumber >= pages) {
      this.prevUrl = prevUrl;
      this.nextUrl = '';
    } else {
      this.prevUrl = prevUrl;
      this.nextUrl = nextUrl;
    }
  }
}

module.exports = Pagination;
