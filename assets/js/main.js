(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mobileNav = window.matchMedia('(max-width: 900px)');
  const $ = id => document.getElementById(id);
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  const navbar = $('navbar');
  const themeToggle = $('themeToggle');
  const menuToggle = $('menuToggle');
  const navLinks = $('navLinks');
  const navIndicator = $('navIndicator');
  const backToTop = $('backToTop');
  const fabCv = $('fabCv');
  const yearEl = $('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animación de entrada del hero
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('loaded')));

  /* ---------- Tema ---------- */
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    themeToggle?.setAttribute('aria-label', dark ? 'Activar modo día' : 'Activar modo noche');
    themeMeta?.setAttribute('content', dark ? '#130e10' : '#fcf8f7');
  };
  syncTheme();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* Preferencia opcional. */ }
    syncTheme();
  });

  /* ---------- Menú móvil ---------- */
  const setMenu = open => {
    navLinks?.classList.toggle('open', open);
    root.classList.toggle('menu-open', open);
    if (open) { navbar?.classList.remove('hidden'); fabCv?.classList.remove('show'); }
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (navLinks) navLinks.inert = mobileNav.matches && !open;
  };
  setMenu(false);
  menuToggle?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) { setMenu(false); menuToggle?.focus(); }
  });
  mobileNav.addEventListener('change', () => { setMenu(false); moveIndicator(); });

  /* ---------- Indicador deslizante del menú ---------- */
  const navAnchors = [...document.querySelectorAll('.nav-link')];
  function moveIndicator() {
    if (!navIndicator) return;
    const active = navAnchors.find(a => a.classList.contains('active'));
    if (!active || mobileNav.matches) { navIndicator.classList.remove('on'); return; }
    navIndicator.style.setProperty('--x', `${active.offsetLeft}px`);
    navIndicator.style.width = `${active.offsetWidth}px`;
    navIndicator.classList.add('on');
  }
  const setActive = id => {
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    moveIndicator();
  };

  /* ---------- Scrollspy ---------- */
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spyObserver.observe(s));
  window.addEventListener('resize', moveIndicator);
  document.fonts?.ready.then(moveIndicator);

  /* ---------- Revelado al hacer scroll ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.filter(e => e.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--delay', `${i * 80}ms`);
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Frase del perfil: se ilumina palabra a palabra ---------- */
  const statement = $('statement');
  const statementText = $('statementText');
  let words = [];
  if (statementText && !reducedMotion) {
    const highlight = new Set(['equipos,', 'sistemas', 'portátiles.', 'aplicaciones', 'web', 'extremo']);
    statementText.innerHTML = statementText.textContent.trim().split(/\s+/)
      .map(w => `<span class="word${highlight.has(w) ? ' hl' : ''}">${w}</span>`).join(' ');
    words = [...statementText.querySelectorAll('.word')];
  }

  /* ---------- Contadores ---------- */
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      countObserver.unobserve(el);
      if (reducedMotion) return;
      const start = performance.now();
      const dur = 1400;
      const step = now => {
        const t = clamp((now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  /* ---------- Barras de idiomas ---------- */
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = `${entry.target.dataset.width}%`;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.language-fill').forEach(bar => barObserver.observe(bar));

  /* ---------- Bucle de scroll (un único requestAnimationFrame) ---------- */
  const heroSection = $('home');
  const heroInner = $('heroInner');
  const timeline = $('timeline');
  const timelineItems = timeline ? [...timeline.querySelectorAll('.timeline-item')] : [];
  const projectCards = [...document.querySelectorAll('.project-card')];
  const browsers = [...document.querySelectorAll('.browser')];
  const cvPaper = $('cvPaper');
  const cvSection = $('cv');
  const contactSection = $('contact');
  const footer = $('footer');
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const docH = root.scrollHeight - vh;

    root.style.setProperty('--progress', docH > 0 ? (y / docH).toFixed(4) : 0);

    // Barra de navegación: se compacta y se oculta al bajar, reaparece al subir
    const menuOpen = navLinks?.classList.contains('open');
    navbar?.classList.toggle('scrolled', y > 24);
    if (!menuOpen) navbar?.classList.toggle('hidden', y > vh * .9 && y > lastY + 2);
    if (y < lastY - 2) navbar?.classList.remove('hidden');
    lastY = y;

    backToTop?.classList.toggle('show', y > 600);

    if (reducedMotion) return;

    // Hero: se aleja al hacer scroll
    if (heroSection && heroInner) {
      const h = heroSection.offsetHeight;
      heroInner.style.setProperty('--hero-p', clamp(y / (h * .85)).toFixed(3));
      heroSection.style.setProperty('--hero-p', clamp(y / (h * .85)).toFixed(3));
    }

    // Frase del perfil
    if (statement && words.length) {
      const r = statement.getBoundingClientRect();
      const p = clamp((-r.top + vh * .15) / (r.height - vh * .9));
      const n = words.length;
      words.forEach((w, i) => w.style.setProperty('--o', (.14 + .86 * clamp(p * n * 1.15 - i)).toFixed(3)));
    }

    // Línea de experiencia que se rellena
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const mark = vh * .62;
      timeline.style.setProperty('--fill', clamp((mark - r.top) / r.height).toFixed(4));
      timelineItems.forEach(item => {
        item.classList.toggle('is-active', item.getBoundingClientRect().top + 30 < mark);
      });
    }

    // Proyectos: las tarjetas anteriores se reducen al apilarse
    if (!mobileNav.matches) {
      projectCards.forEach((card, i) => {
        const next = projectCards[i + 1];
        if (!next) return;
        const dist = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
        card.style.setProperty('--stack', clamp(1 - dist / card.offsetHeight).toFixed(3));
      });
    } else {
      projectCards.forEach(card => card.style.removeProperty('--stack'));
    }
    browsers.forEach(b => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--par', clamp((vh - r.top) / (vh + r.height)).toFixed(3));
    });

    // CV: la hoja se endereza al entrar en pantalla
    if (cvPaper) {
      const r = cvPaper.getBoundingClientRect();
      cvPaper.style.setProperty('--tilt', (1 - clamp((vh - r.top) / (vh * .75))).toFixed(3));
    }

    // Botón flotante del CV en móvil
    if (fabCv && heroSection) {
      const pastHero = y > heroSection.offsetHeight * .7;
      const near = [cvSection, contactSection, footer].some(el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      fabCv.classList.toggle('show', pastHero && !near && !menuOpen);
    }
  };

  const requestUpdate = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));

  /* ---------- Interacciones con ratón (solo escritorio) ---------- */
  if (finePointer && !reducedMotion) {
    // Monograma con inclinación 3D
    const tilt = $('tiltCard');
    tilt?.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      tilt.classList.add('tilting');
      tilt.style.setProperty('--rx', `${(px - .5) * 18}deg`);
      tilt.style.setProperty('--ry', `${(.5 - py) * 18}deg`);
      tilt.style.setProperty('--gx', `${px * 100}%`);
      tilt.style.setProperty('--gy', `${py * 100}%`);
    });
    tilt?.addEventListener('pointerleave', () => {
      tilt.classList.remove('tilting');
      tilt.style.setProperty('--rx', '0deg');
      tilt.style.setProperty('--ry', '0deg');
    });

    // Brillo que sigue al cursor
    document.querySelectorAll('.spotlight').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    // Botones magnéticos
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * .18}px, ${dy * .28}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Texto que se escribe solo ---------- */
  const roles = [
    'Desarrollo aplicaciones web',
    'Monto y configuro equipos',
    'Programo en Java, Python y JavaScript',
    'Mantengo webs con WordPress'
  ];
  const typedRole = $('typedRole');
  if (typedRole && !reducedMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = false;
    const tick = () => {
      const current = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      typedRole.textContent = current.slice(0, charIndex);
      let delay = deleting ? 32 : 62;
      if (!deleting && charIndex === current.length) { delay = 1900; deleting = true; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 320; }
      setTimeout(tick, delay);
    };
    // Empieza con la primera frase escrita y comienza a borrar tras una pausa.
    deleting = true;
    setTimeout(tick, 2600);
  }

  /* ---------- Formulario -> correo ---------- */
  $('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('name').value.trim();
    const email = $('email').value.trim();
    const message = $('message').value.trim();
    const subject = encodeURIComponent(`Contacto desde mi CV web — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:alvaromolmateo@gmail.com?subject=${subject}&body=${body}`;
  });
})();
