/* ============================================================
   PORTFOLIO — script.js
   ============================================================ */

// ── Scrolled nav ────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll-reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .featured-card');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.07}s`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── Typewriter in hero mockup ─────────────────────────────────
const phrases = [
  'Launch my SaaS in 30 days',
  'Write a research paper',
  'Get fit for summer',
  'Learn to code from scratch',
  'Plan my dream vacation',
];

const tasks = [
  [
    'Research your target market',
    'Build an MVP landing page',
    'Set up payment processing',
    'Launch on Product Hunt',
  ],
  [
    'Choose your research topic',
    'Gather 10 academic sources',
    'Create an outline',
    'Write first draft',
  ],
  [
    'Set a realistic goal weight',
    'Plan a weekly workout schedule',
    'Meal prep on Sundays',
    'Track progress weekly',
  ],
  [
    'Pick a beginner-friendly language',
    'Complete a free online course',
    'Build your first project',
    'Join a developer community',
  ],
  [
    'Pick your destination',
    'Set a travel budget',
    'Book flights & accommodation',
    'Plan daily itinerary',
  ],
];

let phraseIdx   = 0;
let charIdx     = 0;
let isDeleting  = false;
let taskTimeout = null;

const typewriterEl = document.getElementById('typewriter');
const previewTasks = document.getElementById('preview-tasks');

function renderTasks(idx) {
  previewTasks.innerHTML = '';
  tasks[idx].forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'preview-task';
    div.innerHTML = `<span class="preview-task__dot"></span>${text}`;
    previewTasks.appendChild(div);
    // stagger appearance
    setTimeout(() => div.classList.add('visible'), 120 * i);
  });
}

function type() {
  const phrase = phrases[phraseIdx];

  if (!isDeleting) {
    charIdx++;
    typewriterEl.textContent = phrase.slice(0, charIdx);

    // Show tasks when phrase is fully typed
    if (charIdx === phrase.length) {
      clearTimeout(taskTimeout);
      taskTimeout = setTimeout(() => renderTasks(phraseIdx), 300);
      setTimeout(() => { isDeleting = true; type(); }, 2800);
      return;
    }
  } else {
    charIdx--;
    typewriterEl.textContent = phrase.slice(0, charIdx);

    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      previewTasks.innerHTML = '';
      setTimeout(type, 400);
      return;
    }
  }

  const speed = isDeleting ? 32 : 54;
  setTimeout(type, speed);
}

// Start typewriter after short delay
setTimeout(type, 800);

// ── Smooth scroll for all anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Cursor glow follow ────────────────────────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,109,250,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
  will-change: left, top;
`;
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
}, { passive: true });
