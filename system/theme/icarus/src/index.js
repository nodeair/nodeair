import initBackToTop from './init-back-to-top';
import initTopNav from './init-top-nav';

/**
 * Icarus 主题脚本
 */
class Icarus {
  constructor() {
    $(document).ready(() => {
      initTopNav();
      initBackToTop();
    });
  }
}

new Icarus();

export default Icarus;
