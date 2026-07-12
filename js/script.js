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
  const isRestaurantOpenNow = () => {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    return hour >= 9 && hour < 20;
  };

  const updateOpenStatus = () => {
    const badges = document.querySelectorAll('.status-badge');
    if (!badges.length) return;
    const isOpen = isRestaurantOpenNow();
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

  // Asistente virtual: bot de reglas 100% en el navegador (sin API, sin costo).
  // Lee el menú directamente de esta misma página, así que si el menú cambia
  // en el HTML, el asistente responde con los datos actualizados automáticamente.
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  if (chatToggle && chatWindow && chatForm && chatInput && chatMessages) {
    const WHATSAPP_URL = 'https://wa.me/523151090369?text=Hola%2C%20quiero%20hacer%20una%20reservaci%C3%B3n';
    const MAPS_URL = 'https://maps.app.goo.gl/NESaxGmG6GVfdMAj8';

    const openChat = () => {
      chatWindow.classList.add('is-open');
      chatWindow.setAttribute('aria-hidden', 'false');
      chatToggle.setAttribute('aria-expanded', 'true');
      chatInput.focus();
    };
    const closeChat = () => {
      chatWindow.classList.remove('is-open');
      chatWindow.setAttribute('aria-hidden', 'true');
      chatToggle.setAttribute('aria-expanded', 'false');
    };

    chatToggle.addEventListener('click', () => {
      chatWindow.classList.contains('is-open') ? closeChat() : openChat();
    });
    if (chatClose) chatClose.addEventListener('click', closeChat);

    // Cada parte puede ser texto plano o { href, label } para un enlace
    const addMessage = (parts, kind) => {
      const el = document.createElement('div');
      el.className = `chat-msg chat-msg-${kind}`;
      const list = Array.isArray(parts) ? parts : [parts];
      list.forEach((part) => {
        if (typeof part === 'string') {
          el.appendChild(document.createTextNode(part));
        } else {
          const a = document.createElement('a');
          a.href = part.href;
          a.textContent = part.label;
          a.target = '_blank';
          a.rel = 'noopener';
          el.appendChild(a);
        }
      });
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return el;
    };

    const addTyping = () => {
      const el = document.createElement('div');
      el.className = 'chat-msg-typing';
      el.innerHTML = '<span></span><span></span><span></span>';
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return el;
    };

    // Lee el menú directamente del DOM: categoría -> { title, items, tags }
    const buildMenuIndex = () => {
      const index = {};
      document.querySelectorAll('.menu-category').forEach((cat) => {
        const titleEl = cat.querySelector('.category-title');
        const title = titleEl
          ? Array.from(titleEl.childNodes)
              .filter((node) => node.nodeType === Node.TEXT_NODE)
              .map((node) => node.textContent.trim())
              .join(' ')
              .trim() || titleEl.textContent.trim()
          : cat.id;
        const items = Array.from(cat.querySelectorAll('.menu-item')).map((li) => ({
          name: li.querySelector('.item-name')?.textContent.trim() || '',
          price: li.querySelector('.item-price')?.textContent.trim() || '',
        }));
        const tags = Array.from(cat.querySelectorAll('.menu-tags li')).map((li) => li.textContent.trim());
        index[cat.id] = { title, items, tags };
      });
      return index;
    };
    const menuIndex = buildMenuIndex();

    const CATEGORY_KEYWORDS = {
      bebidas: ['bebida', 'tomar', 'jugo', 'agua', 'limonada', 'naranjada', 'refresco', 'mojito'],
      especialidades: ['especialidad', 'zarandead'],
      'pescado-frito': ['pescado frito', 'frito'],
      filete: ['filete'],
      pulpo: ['pulpo'],
      camarones: ['camaron'],
      entradas: ['entrada', 'hamburguesa', 'papas', 'milanesa'],
      ensaladas: ['ensalada'],
      coctel: ['coctel', 'cóctel'],
      postres: ['postre', 'dulce', 'cheesecake', 'helado'],
      jarras: ['jarra'],
      cerveza: ['cerveza', 'chela'],
      'vinos-licores': ['vino', 'licor', 'whisky', 'ron ', 'vodka'],
      tequila: ['tequila'],
    };

    const normalize = (text) => text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');

    const formatCategoryReply = (catId) => {
      const cat = menuIndex[catId];
      if (!cat) return null;
      if (cat.tags && cat.tags.length) {
        return `${cat.title}: disponibles en sabores ${cat.tags.join(', ')}. Consulta el precio base en Bebidas dentro de la sección Menú.`;
      }
      const shown = cat.items.slice(0, 8);
      const lines = shown.map((it) => `• ${it.name} — ${it.price}`).join('\n');
      const extra = cat.items.length > shown.length ? `\n…y ${cat.items.length - shown.length} más en la sección Menú.` : '';
      return `${cat.title}:\n${lines}${extra}`;
    };

    const getReply = (rawMessage) => {
      const msg = normalize(rawMessage);

      if (/\b(hola|buenas|buenos dias|buenas tardes|buenas noches|que tal)\b/.test(msg)) {
        return '¡Hola! 👋 Puedo ayudarte con el menú, precios, horario, ubicación o cómo reservar. ¿Qué te gustaría saber?';
      }
      if (/\bgracias\b/.test(msg)) {
        return '¡Con gusto! ¿Algo más en lo que pueda ayudarte?';
      }
      if (/\b(hora|horario|abren|cierran|abierto|cerrado)\b/.test(msg)) {
        const openNow = isRestaurantOpenNow() ? 'En este momento estamos abiertos.' : 'En este momento estamos cerrados.';
        return `Abrimos todos los días de 9:00 a.m. a 8:00 p.m. ${openNow}`;
      }
      if (/\b(direccion|ubicacion|donde estan|donde queda|mapa|llegar)\b/.test(msg)) {
        return [
          'Nos encuentras aquí: ',
          { href: MAPS_URL, label: 'ver ubicación en Google Maps' },
          '.',
        ];
      }
      if (/\b(telefono|numero|whatsapp|contacto|llamar)\b/.test(msg)) {
        return [
          'Puedes escribirnos al +52 315 109 0369: ',
          { href: WHATSAPP_URL, label: 'abrir WhatsApp' },
          '.',
        ];
      }
      if (/\b(reserva|reservar|mesa|apartar)\b/.test(msg)) {
        return [
          'Para reservar mesa, escríbenos directo por WhatsApp: ',
          { href: WHATSAPP_URL, label: 'reservar por WhatsApp' },
          '. No es indispensable, pero ayuda sobre todo en fin de semana.',
        ];
      }

      for (const [catId, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some((kw) => msg.includes(kw))) {
          const reply = formatCategoryReply(catId);
          if (reply) return reply;
        }
      }

      if (/\b(menu|carta|platillos|comida|precio|cuesta|cuanto)\b/.test(msg)) {
        const catNames = Object.values(menuIndex).map((c) => c.title).join(', ');
        return `Tenemos estas secciones en el menú: ${catNames}. Dime cuál te interesa (por ejemplo "camarones" o "cerveza") y te paso los precios, o revisa la sección Menú completa arriba.`;
      }

      return [
        'No estoy seguro de eso. Puedo ayudarte con el menú, precios, horario, ubicación o cómo reservar. Para algo más específico, escríbenos por WhatsApp: ',
        { href: WHATSAPP_URL, label: 'escribir por WhatsApp' },
        '.',
      ];
    };

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      addMessage(message, 'user');
      chatInput.value = '';
      chatInput.disabled = true;
      const typingEl = addTyping();

      window.setTimeout(() => {
        typingEl.remove();
        addMessage(getReply(message), 'bot');
        chatInput.disabled = false;
        chatInput.focus();
      }, 350);
    });
  }
});
