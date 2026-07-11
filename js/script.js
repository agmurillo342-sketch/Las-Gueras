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

  // Resalta la pestaña del menú activa según la sección visible
  const tabs = Array.from(document.querySelectorAll('.menu-tab'));
  const categories = Array.from(document.querySelectorAll('.menu-category'));

  if (tabs.length && categories.length && 'IntersectionObserver' in window) {
    const setActiveTab = (id) => {
      tabs.forEach((tab) => {
        tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveTab(visible[0].target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    categories.forEach((section) => observer.observe(section));
  }

  // Centra la pestaña activa dentro del carrusel horizontal de categorías
  const menuTabsNav = document.getElementById('menuTabs');
  if (menuTabsNav) {
    menuTabsNav.addEventListener('click', (event) => {
      const tab = event.target.closest('.menu-tab');
      if (!tab) return;
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  }
});
