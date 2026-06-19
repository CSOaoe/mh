const header = document.querySelector('.site-header');
const menu = document.querySelector('#nav');
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  const dark = window.scrollY < window.innerHeight * 0.85;
  header.style.position = window.scrollY > window.innerHeight ? 'fixed' : 'absolute';
  header.style.background = window.scrollY > window.innerHeight ? 'rgba(238,234,226,.94)' : 'transparent';
  header.style.color = dark ? '#fff' : '#161512';
  header.style.backdropFilter = window.scrollY > window.innerHeight ? 'blur(12px)' : 'none';
});
