$(function () {
  var section = document.getElementById('Publications');
  var controls = section.querySelector('.publication-filter');
  var buttons = controls.querySelectorAll('[data-view]');
  var groups = section.querySelectorAll('.publication-group');
  var papers = section.querySelectorAll('.publication');
  var status = document.getElementById('publication-status');

  function setView(view) {
    var visible = 0;
    papers.forEach(function (paper) {
      paper.hidden = view === 'highlights' && !paper.hasAttribute('data-highlight');
      if (!paper.hidden) visible++;
    });
    groups.forEach(function (group) {
      group.hidden = !group.querySelector('.publication:not([hidden])');
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.view === view));
    });
    status.textContent = 'Showing ' + visible + ' of ' + papers.length + ' publications.';
    $('body').scrollspy('refresh');
  }

  function revealFragment(hash) {
    var target = document.getElementById(hash.slice(1));
    if (target && section.contains(target) && target.closest('[hidden]')) {
      setView('all');
      return target;
    }
  }

  buttons.forEach(function (button) {
    var count = button.dataset.view === 'all' ? papers.length : section.querySelectorAll('[data-highlight]').length;
    button.querySelector('.view-count').textContent = count;
    button.addEventListener('click', function () {
      setView(button.dataset.view);
    });
  });
  controls.hidden = false;

  // Reveal a hidden destination before the browser follows a local link.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (link) revealFragment(link.hash);
  });
  window.addEventListener('hashchange', function () {
    var target = revealFragment(window.location.hash);
    if (target) target.scrollIntoView();
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    mainClass: 'mfp-no-margins',
    closeOnContentClick: true,
    closeBtnInside: false,
    image: {
      verticalFit: true,
      titleSrc: function (item) {
        return item.el.find('img').attr('alt');
      }
    }
  });
});
