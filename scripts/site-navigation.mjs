// One source for every page's navigation; rendered into HTML at build time.
export const pageSubjects = {
  'index.html': 'home',
  'describe.html': 'chinese',
  'story.html': 'chinese',
  'math.html': 'math',
  'compare.html': 'math',
  'make24.html': 'math',
  'sudoku.html': 'math'
};

const primaryLinks = [
  ['home', 'index.html', '首页', 'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10'],
  ['chinese', 'describe.html', '语文', 'M12 5C8 2 5 3 3 4v15c3-1 6-1 9 1m0-15c4-3 7-2 9-1v15c-3-1-6-1-9 1V5Z'],
  ['math', 'math.html', '数学', 'M5 7h6M8 4v6m7-3h5M5 16l6 6m0-6-6 6m10-5h5m-5 4h5']
];
const subjectLinks = {
  chinese: [
    ['words', 'describe.html', '词语填空'],
    ['paragraphs', 'describe.html#paragraphs', '一段话选词'],
    ['story', 'story.html', '编故事'],
    ['works', 'story.html#works', '我的故事本']
  ],
  math: [
    ['arithmetic', 'math.html', '数学思维'],
    ['compare', 'compare.html', '两步应用题'],
    ['make24', 'make24.html', '24 点'],
    ['sudoku', 'sudoku.html', '数独']
  ]
};

export function renderHeader(page) {
  const subject = pageSubjects[page];
  const primary = primaryLinks.map(([key, href, label, icon]) => `        <a class="site-nav__link" href="${href}"${key === subject ? ` aria-current="${key === 'home' ? 'page' : 'location'}"` : ''}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}" /></svg><span>${label}</span></a>`).join('\n');
  const secondary = subjectLinks[subject]?.map(([key, href, label]) => `      <a href="${href}" data-nav-section="${key}"${href === page ? ' aria-current="page"' : ''}>${label}</a>`).join('\n');
  return `<header class="site-header" data-subject="${subject}">
    <div class="site-header__main">
      <a class="site-brand" href="index.html" aria-label="学习星球首页"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="31" r="18" fill="#7767e9" /><path d="M14 29c-8 4-11 9-8 13 5 7 28 3 43-5 9-5 12-10 9-13-2-3-7-3-13-1" fill="none" stroke="#e6a52e" stroke-width="6" stroke-linecap="round" /><circle cx="25" cy="25" r="3" fill="#bdb5ff" /></svg><span>学习星球</span></a>
      <nav class="site-nav" aria-label="学习科目">
${primary}
      </nav>
      <div class="site-stars" aria-label="收集的数学星星"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" /></svg><span id="starCount">0</span><span class="site-stars__label">颗星星</span></div>
    </div>
${secondary ? `    <nav class="site-subnav" aria-label="${subject === 'chinese' ? '语文' : '数学'}练习">\n${secondary}\n    </nav>` : '    <p class="site-header__welcome">选一个喜欢的科目，开始今天的探索。</p>'}
  </header>`;
}
