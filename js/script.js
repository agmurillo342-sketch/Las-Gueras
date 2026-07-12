// Restaurante Las Güeras — interactividad del sitio (sin dependencias externas)

document.addEventListener('DOMContentLoaded', () => {
  // Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú de navegación (hamburguesa)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // El sitio se desliza normalmente por todas las secciones. Al elegir una
  // sección desde el menú (☰) además cruza la pantalla un pez, como si
  // "volteara la página" hacia esa sección.
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-page]'));
  const fishTransition = document.getElementById('fishTransition');

  const setCurrentNavLink = (pageId) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-current', link.dataset.page === pageId);
    });
  };

  const triggerFishSwim = () => {
    if (!fishTransition) return;
    fishTransition.classList.remove('is-swimming');
    void fishTransition.offsetWidth; // reflow para poder repetir la animación
    fishTransition.classList.add('is-swimming');
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      triggerFishSwim();
      setCurrentNavLink(link.dataset.page);
      closeNav();
    });
  });

  // Resalta en el menú la sección que está visible mientras se hace scroll
  const sections = Array.from(document.querySelectorAll('.pages-viewport > .page[id^="page-"]'));
  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentNavLink(entry.target.id.replace('page-', ''));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Indicador de abierto/cerrado según el horario (todos los días 9:00–20:00)
  const updateOpenStatus = () => {
    const badges = document.querySelectorAll('.status-badge');
    if (!badges.length) return;
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const isOpen = hour >= 9 && hour < 20;
    badges.forEach((badge) => {
      badge.classList.toggle('is-open', isOpen);
      badge.classList.toggle('is-closed', !isOpen);
      const label = badge.querySelector('.status-label');
      if (label) label.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
    });
  };
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  // Menú por pestañas: al presionar una categoría se muestra solo esa sección
  const tabs = Array.from(document.querySelectorAll('.menu-tab'));
  const categories = Array.from(document.querySelectorAll('.menu-category'));
  const menuTabsNav = document.getElementById('menuTabs');

  const showCategory = (targetId) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetId;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    categories.forEach((section) => {
      section.classList.toggle('is-active', section.id === targetId);
    });
  };

  if (menuTabsNav && tabs.length && categories.length) {
    menuTabsNav.addEventListener('click', (event) => {
      const tab = event.target.closest('.menu-tab');
      if (!tab) return;
      showCategory(tab.dataset.target);
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });

    // Muestra la primera categoría (Bebidas) por defecto
    showCategory(tabs[0].dataset.target);
  }
});
