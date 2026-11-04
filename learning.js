(() => {
  'use strict';
  try {
    const saved = JSON.parse(localStorage.getItem('storyDirector.v1') || '{}');
    const count = Object.values(saved.lessons || {}).filter(x => x.done).length;
    document.querySelector('#storyProgress').textContent = count ? `已探索 ${count} / 8 个训练 · 接着上次的小故事` : '从一个小点子开始，慢慢编出自己的故事';
    const words = JSON.parse(localStorage.getItem('wordPainter.v1') || '{}');
    const wordCount = Object.keys(words.seen || {}).length;
    document.querySelector('#wordProgress').textContent = wordCount ? `词语填空已练过 ${wordCount} / 30 题 · 接着选一选` : '先练选词填空，每轮 3 题。';
    const stars = Number(localStorage.getItem('mathPlanetStars')) || 0;
    document.querySelector('#mathProgress').textContent = stars ? `已收集 ${stars} 颗数学星星 · 继续挑战` : '二至四年级 · 找规律、巧计算、读懂情景';
  } catch { /* The page stays usable when local storage is unavailable. */ }
})();
