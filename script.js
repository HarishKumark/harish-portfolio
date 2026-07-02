const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta?.setAttribute('content', dark ? '#0d1730' : '#f7f9fd');
}

const storedTheme = localStorage.getItem('portfolio-theme');
const preferredTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(storedTheme || preferredTheme);

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
});

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 10);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = mobileNav?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(open)));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  });
});

const tabs = document.querySelectorAll('.tech-tab');
const panels = document.querySelectorAll('.tech-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
