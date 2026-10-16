(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const menuItems = Array.from(document.querySelectorAll('.site-nav__list a'));
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const themeStorageKey = 'shunya-theme';
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const getActiveTheme = () => {
    if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') {
      return root.dataset.theme;
    }

    return darkQuery.matches ? 'dark' : 'light';
  };

  const updateThemeInterface = () => {
    const activeTheme = getActiveTheme();
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

    root.style.colorScheme = activeTheme;

    if (themeColor) {
      themeColor.content = activeTheme === 'dark' ? '#1a1a1a' : '#ffffff';
    }

    if (themeToggle) {
      const label = `Switch to ${nextTheme === 'dark' ? 'night' : 'light'} mode`;
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('aria-pressed', String(activeTheme === 'dark'));
      themeToggle.title = label;
    }

  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;

    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // The selected theme still applies for this page when storage is unavailable.
    }

    updateThemeInterface();
  };

  themeToggle?.addEventListener('click', () => {
    setTheme(getActiveTheme() === 'dark' ? 'light' : 'dark');
  });

  darkQuery.addEventListener?.('change', () => {
    if (!root.dataset.theme) updateThemeInterface();
  });

  updateThemeInterface();

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuToggle || !menu) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');

    if (restoreFocus) menuToggle.focus();
  };

  const openMenu = () => {
    if (!menuToggle || !menu) return;

    menuToggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    window.setTimeout(() => menuItems[0]?.focus(), 0);
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
      closeMenu({ restoreFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (
      menu?.classList.contains('is-open') &&
      !menu.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('is-active', isActive);

      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const visibleSections = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target.id, entry);
          else visibleSections.delete(entry.target.id);
        });

        const activeEntry = Array.from(visibleSections.values()).sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (activeEntry) setActiveLink(activeEntry.target.id);
      },
      {
        rootMargin: '-24% 0px -60% 0px',
        threshold: [0, 0.05, 0.25, 0.5]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menu?.setAttribute('aria-hidden', 'true');

  const mobileQuery = window.matchMedia('(max-width: 767px)');
  mobileQuery.addEventListener?.('change', (event) => {
    if (!event.matches) closeMenu();
  });
})();
