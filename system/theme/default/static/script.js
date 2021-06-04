$(document).ready(function() {
  var cUrl = window.location.href;
  var els = $('.navbar-menu .navbar-item');
  $(els).each(function (index, el) {
    var href = $(el).attr('href');
    if (href === cUrl.substr(0, cUrl.length - 1)) {
      $(el).addClass('is-active');
    } else if (href === cUrl) {
      $(el).addClass('is-active');
    }
  });
});
