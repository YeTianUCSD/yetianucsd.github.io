// Native fragment links keep deep links and the browser's Back button working.
// Fixed-header spacing and reduced-motion preferences are handled in CSS.
$(function () {
  var menu = $('#site-menu');
  var toggle = $('.navbar-toggle');

  menu.on('show.bs.collapse hide.bs.collapse', function (event) {
    toggle.attr('aria-expanded', event.type === 'show' ? 'true' : 'false');
  });

  menu.on('click', 'a', function () {
    if (menu.hasClass('in')) {
      menu.collapse('hide');
    }
  });
});
