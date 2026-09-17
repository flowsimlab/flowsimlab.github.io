/* flowsimlab — script.js */

// Scrolled nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Products dropdown
const dd = document.querySelector('.nav__item--dropdown');
if (dd) {
  const toggle = dd.querySelector('.nav__dropdown-toggle');
  const open  = () => { dd.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); };
  const close = () => { dd.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', (e) => { e.stopPropagation(); dd.classList.contains('open') ? close() : open(); });
  dd.addEventListener('mouseenter', open);
  dd.addEventListener('mouseleave', close);
  dd.querySelectorAll('.nav__dropdown-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', (e) => { if (!dd.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Scroll reveal
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sib = Array.from(entry.target.parentElement.children);
      entry.target.style.transitionDelay = `${sib.indexOf(entry.target) * 0.06}s`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// TodoByAI typewriter mockup
const phrases = [
  'Launch my SaaS in 30 days',
  'Write a research paper',
  'Get fit for summer',
  'Learn to code from scratch',
  'Plan my dream vacation',
];
const tasks = [
  ['Research your target market', 'Build an MVP landing page', 'Set up payment processing', 'Launch on Product Hunt'],
  ['Choose your research topic', 'Gather 10 academic sources', 'Create an outline', 'Write first draft'],
  ['Set a realistic goal weight', 'Plan a weekly workout schedule', 'Meal prep on Sundays', 'Track progress weekly'],
  ['Pick a beginner-friendly language', 'Complete a free online course', 'Build your first project', 'Join a developer community'],
  ['Pick your destination', 'Set a travel budget', 'Book flights & accommodation', 'Plan daily itinerary'],
];
let pi = 0, ci = 0, del = false, tOut = null;
const tw = document.getElementById('typewriter');
const pt = document.getElementById('preview-tasks');

function renderTasks(idx) {
  if (!pt) return;
  pt.innerHTML = '';
  tasks[idx].forEach((text, i) => {
    const d = document.createElement('div');
    d.className = 'preview-task';
    d.innerHTML = `<span class="preview-task__dot"></span>${text}`;
    pt.appendChild(d);
    setTimeout(() => d.classList.add('visible'), 110 * i);
  });
}
function type() {
  if (!tw) return;
  const phrase = phrases[pi];
  if (!del) {
    ci++; tw.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) {
      clearTimeout(tOut);
      tOut = setTimeout(() => renderTasks(pi), 300);
      setTimeout(() => { del = true; type(); }, 2600);
      return;
    }
  } else {
    ci--; tw.textContent = phrase.slice(0, ci);
    if (ci === 0) {
      del = false; pi = (pi + 1) % phrases.length;
      if (pt) pt.innerHTML = '';
      setTimeout(type, 400);
      return;
    }
  }
  setTimeout(type, del ? 30 : 52);
}
setTimeout(type, 700);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length < 2) return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
