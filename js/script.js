// Restaurante Las Güeras — interactividad del sitio (sin dependencias externas)

document.addEventListener('DOMContentLoaded', () => {
  // Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú de navegación (hamburguesa) — única forma de moverse entre secciones
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

  // Secciones (páginas): solo una visible a la vez, accesibles únicamente
  // desde el menú de navegación. Al cambiar, la sección saliente gira como
  // la página de un libro mientras un pez la "voltea".
  const PAGE_TRANSITION_MS = 600;
  const pages = Array.from(document.querySelectorAll('.page'));
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

  const showPage = (pageId) => {
    const target = document.getElementById(`page-${pageId}`);
    if (!target) return;
    const current = pages.find((page) => page.classList.contains('is-visible'));
    if (current === target) { closeNav(); return; }

    triggerFishSwim();

    // La página entrante ya queda lista debajo; se revela conforme la
    // saliente gira hacia su izquierda, como si se volteara una hoja.
    target.classList.add('is-visible', 'is-active');
    target.scrollTop = 0;

    if (current) {
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      window.setTimeout(() => {
        current.classList.remove('is-visible', 'is-leaving');
      }, PAGE_TRANSITION_MS);
    }

    setCurrentNavLink(pageId);
    closeNav();
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-page]');
    if (!trigger) return;
    event.preventDefault();
    showPage(trigger.dataset.page);
  });

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
