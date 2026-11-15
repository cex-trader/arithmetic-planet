(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  if (!header) return;
  const page = location.pathname.split('/').pop() || 'index.html';

  function update() {
    let section;
    if (page === 'describe.html') {
      let paragraphPractice = false;
      try {
        const saved = JSON.parse(localStorage.getItem('wordPainter.v1') || 'null');
        paragraphPractice = location.hash === '#practice' && saved?.round?.level === 3;
      } catch { /* Navigation works without saved progress. */ }
      section = location.hash.startsWith('#paragraph') || paragraphPractice ? 'paragraphs' : 'words';
    } else if (page === 'story.html') {
      section = location.hash === '#works' ? 'works' : 'story';
    } else {
      section = { 'math.html': 'arithmetic', 'compare.html': 'compare', 'make24.html': 'make24', 'sudoku.html': 'sudoku' }[page];
    }
    header.querySelectorAll('[data-nav-section]').forEach(link => {
      if (link.dataset.navSection === section) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    try {
      const stars = Math.max(0, Number(localStorage.getItem('mathPlanetStars')) || 0);
      header.querySelector('#starCount').textContent = String(stars);
    } catch { /* The default star count remains available. */ }
  }
  window.addEventListener('hashchange', update);
  window.addEventListener('pageshow', update);
  window.addEventListener('storage', update);
  update();
})();
