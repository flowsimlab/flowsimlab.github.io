/* flowsimlab — script.js (minimal, matches source behavior) */

// Products dropdown: hover works via CSS; add click toggle for touch devices
const menu = document.querySelector('.menu');
if (menu) {
  const btn = menu.querySelector('button');
  btn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('open'); });
  menu.querySelectorAll('.dropdown a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.classList.remove('open'); });
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length < 2) return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
