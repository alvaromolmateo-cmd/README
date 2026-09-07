(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const updateThemeLabel = () => themeToggle?.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Activar modo día' : 'Activar modo noche');
  try {
    const savedTheme = localStorage.getItem('theme');
    if (['light', 'dark'].includes(savedTheme)) root.dataset.theme = savedTheme;
  } catch { /* The site remains usable when storage is unavailable. */ }
  updateThemeLabel();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* Optional preference. */ }
    updateThemeLabel();
  });

  // Mobile navigation: keep its accessible state in sync.
  const setMenu = open => {
    navLinks?.classList.toggle('open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (navLinks) navLinks.inert = window.matchMedia('(max-width: 900px)').matches && !open;
  };
  setMenu(false);
  menuToggle?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) { setMenu(false); menuToggle?.focus(); }
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', () => setMenu(false));

  // Scroll-driven: progress bar + navbar shrink + back-to-top
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    navbar?.classList.toggle('scrolled', scrollTop > 40);
    backToTop?.classList.toggle('show', scrollTop > 500);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));

  // Reveal on scroll
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 90}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => revealObserver.observe(item));

  // Scrollspy
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(section => spyObserver.observe(section));

  // Animated language bars
  document.querySelectorAll('.language-fill').forEach(bar => {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.width}%`;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    barObserver.observe(bar);
  });

  // Typing effect
  const roles = [
    'Soy desarrollador web en formación',
    'Estudio Desarrollo de Aplicaciones Web',
    'Quiero crecer como desarrollador full-stack'
  ];
  const typedRole = document.getElementById('typedRole');
  if (typedRole && !reducedMotion) {
    let roleIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typedRole.textContent = current.slice(0, charIndex);

      let delay = deleting ? 35 : 65;
      if (!deleting && charIndex === current.length) { delay = 1600; deleting = true; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }

      setTimeout(tick, delay);
    };
    tick();
  }

  // Contact form -> mailto
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:alvaromolmateo@gmail.com?subject=${subject}&body=${body}`;
  });
})();
