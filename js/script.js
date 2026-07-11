// Restaurante Las Güeras — interactividad del sitio (sin dependencias externas)

document.addEventListener('DOMContentLoaded', () => {
  // Año actual en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú de navegación móvil (hamburguesa)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cierra el menú al elegir una opción
    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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
