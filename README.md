# Restaurante Las Güeras — sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks) para la marisquería. Mobile-first, con galería, opiniones, indicador de abierto/cerrado, botón flotante de WhatsApp y un asistente virtual con IA (única pieza que necesita una función serverless — ver más abajo).

## Navegación

El sitio es una página larga de scroll normal: todas las secciones (Inicio, Menú, Galería, Opiniones, Nosotros, Contacto) están una debajo de otra y se ven deslizando con normalidad, como cualquier sitio de una sola página.

Además, el menú de las tres líneas (☰) en el header permite saltar directo a cualquier sección. Al elegir una sección desde ahí, un pez rojo/naranja (`#fishTransition`, SVG inline en `index.html`) cruza la pantalla como si "volteara la página" hacia esa sección, mientras el navegador hace scroll suave (`scroll-behavior: smooth`) hasta ella. Esta animación solo ocurre al usar el menú ☰; el scroll normal (con el dedo o la rueda del mouse) no la dispara. Toda la orquestación vive en `js/script.js` (`triggerFishSwim`, listeners sobre `.nav-link[data-page]`); el enlace activo en el menú también se resalta automáticamente según la sección visible mientras se hace scroll (`IntersectionObserver`).

Dentro de la sección "Menú" las pestañas de categorías (Bebidas, Camarones, etc.) quedan fijas (`position: sticky`) bajo el header mientras se recorre la lista de platillos, y muestran solo una categoría a la vez.

## Cómo verlo

Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático (por ejemplo `npx serve .`). El asistente virtual (chat) es la única parte que **no** funciona así — necesita estar desplegado en Vercel con la función serverless activa (ver la sección "Asistente virtual").

## Estructura

```
index.html          Marcado completo (header, secciones Inicio/Menú/Galería/Opiniones/Nosotros/Contacto, widget de chat)
css/styles.css       Estilos mobile-first, paleta cálida (rojo, naranja, dorado) inspirada en el logo
js/script.js         Menú del header, scroll-spy, pez de transición, pestañas del menú, indicador abierto/cerrado, chat del asistente, año del footer
assets/logo.png      Logo real del negocio (recortado a 512×512, fondo transparente)
assets/gallery/      6 fotos de platillos usadas en la sección Galería
api/chat.js          Función serverless (Vercel) que llama a la API de Claude para el asistente virtual
package.json         Declara la dependencia @anthropic-ai/sdk que usa api/chat.js
```

## Logo y paleta de colores

Se reemplazó el logo genérico por el logo real proporcionado (círculo rojo-naranja con el texto "Las Güeras" en cursiva blanca y ramas doradas), usado en el header, el hero (con un resplandor animado detrás), el footer y como favicon/`apple-touch-icon`. La paleta de colores en `css/styles.css` se rediseñó por completo con tonos cálidos tomados del logo (rojo ember, naranja coral, dorado, negro-café oscuro) en vez de los azules de mar originales. También se agregaron detalles para hacer el sitio más llamativo: botones con degradado, resplandor pulsante en el logo del hero y en el botón flotante de WhatsApp, subrayado dorado bajo los títulos de sección, y efecto hover en las tarjetas del menú.

## Pendiente por completar (buscar "pendiente" / "$--" / "XXXXXXXXXX" en el código)

- Nombre exacto del negocio (se usó "Las Güeras" inferido del nombre del repositorio; confirmar).
- **Dirección en texto plano** (calle, colonia, ciudad, estado, CP). Ya tenemos el link corto de Google Maps (`https://maps.app.goo.gl/NESaxGmG6GVfdMAj8`) y se usó como botón "Ver en Google Maps" / "Cómo llegar", pero ese link no se pudo resolver automáticamente a una dirección de texto (el entorno donde corrió esta tarea bloquea el acceso saliente a dominios de Google). Faltan por llenar: el texto visible en la sección Nosotros/footer y los campos `streetAddress`/`addressLocality`/`addressRegion`/`postalCode` del JSON-LD en `index.html`.
- **Mapa embebido**: por ahora la sección "Nosotros" muestra una tarjeta con botón que abre Google Maps en una pestaña nueva (en vez de un iframe embebido), porque los links cortos de `maps.app.goo.gl` no se pueden insertar de forma confiable en un `<iframe>`. Cuando tengan la dirección en texto, se puede generar el iframe real desde Google Maps → Compartir → "Insertar un mapa" y pegar ese código en `index.html` (dentro de `.info-map`).
- Precios marcados con `$--`: Callo de Hacha, Tiras de Atún, Molcajete de Aguachile, todos los Postres, Vinos y Licores, y Tequila 30-30 (no se veían en las fotos del menú proporcionadas).
- Imagen para `og:image` en las metaetiquetas Open Graph (opcional, mejora la vista previa al compartir el enlace).

## Horario y teléfono

Se cargó "Todos los días: 9:00 a.m. – 8:00 p.m." en la sección Nosotros, el footer y el JSON-LD (`openingHoursSpecification`), asumiendo que el horario aplica los 7 días de la semana ya que no se especificaron días distintos. Si el restaurante cierra algún día o tiene horario distinto el fin de semana, avísame para ajustarlo.

El teléfono/WhatsApp real (+52 315 109 0369) ya está cargado en todos los enlaces `tel:` y `wa.me`, y en el JSON-LD. Para los enlaces de WhatsApp se usó el formato `52` + 10 dígitos (sin el "1" extra que antes se usaba para celulares mexicanos), que es el formato vigente desde que México eliminó ese requisito en la marcación internacional.

Junto al horario (en "Nosotros" y en el footer) aparece un indicador de "Abierto ahora" / "Cerrado ahora" con un punto verde o rojo. Se calcula en el navegador del visitante (`js/script.js`, `updateOpenStatus`) comparando la hora local del dispositivo contra el rango 9:00–20:00; se recalcula cada minuto. Como usa la hora local del navegador, asume que el visitante está en la misma zona horaria que el restaurante — si reciben visitas de otros husos horarios y quieren fijar la zona exacta, avísenme para ajustarlo.

## Galería y Opiniones

Se agregaron dos secciones nuevas, accesibles también desde el menú ☰:

- **Galería**: 6 fotos de platillos reales del restaurante (camarones al tamarindo, brochetas de camarón, ceviche de pulpo, langosta frita, camarones a la diabla y camarones al ajo), guardadas en `assets/gallery/` ya optimizadas para web.
- **Opiniones**: calificación general "3.9 ★" como título de la subsección, y 3 reseñas reales de Google (Manuel Sosa, Cesar G y Carlos Asdrubal Perez Ceballo) con su calificación individual en estrellas. Si más adelante quieren mostrar reseñas distintas o actualizar la calificación, solo hay que editar el bloque `<section class="reviews-section" id="page-opiniones">` en `index.html`.

## Asistente virtual

El botón redondo arriba del de WhatsApp abre un chat que responde dudas de los visitantes (menú, precios, horario, ubicación, cómo reservar) usando la API de Claude. Todo lo que sabe el asistente está escrito en un solo lugar: la constante `SYSTEM_PROMPT` en `api/chat.js` (horario, teléfono, ubicación y el menú completo con precios). Si el menú o el horario cambian, hay que actualizarlo ahí también para que el asistente no dé información desactualizada.

**Para que funcione necesitas, una sola vez, configurar en Vercel:**

1. Consigue una clave de API en [console.anthropic.com](https://console.anthropic.com) (sección "API Keys"). *No compartas esta clave por chat ni la subas al repositorio.*
2. En tu proyecto de Vercel: **Settings → Environment Variables** → agrega `ANTHROPIC_API_KEY` con esa clave (marca los 3 entornos: Production, Preview, Development).
3. Vuelve a desplegar (o simplemente haz el primer deploy después de agregarla). Vercel detecta `api/chat.js` automáticamente como función serverless e instala `@anthropic-ai/sdk` a partir de `package.json`.

**Costo:** se usa el modelo `claude-opus-4-8`. Para el volumen de preguntas típico de un restaurante esto debería mantenerse en unos pocos dólares al mes; si prefieres priorizar costo sobre calidad de respuesta, puedes cambiar `model: 'claude-opus-4-8'` por `'claude-haiku-4-5'` en `api/chat.js` (mucho más barato, de sobra para responder preguntas frecuentes).

**Nota de seguridad:** el endpoint `/api/chat` es público (cualquiera que visite el sitio puede usarlo), como es normal en un chat de atención al cliente. No hay límite de uso configurado; si en algún momento ven picos de tráfico sospechoso o costo inesperado, se puede agregar un límite de solicitudes por IP o protección adicional en Vercel.

## Notas sobre el menú (actualizado a partir de fotos del menú físico)

- La mayoría de los precios se tomaron directamente de las fotos del menú. Algunos números quedaron ambiguos por la alineación de la foto y se interpretaron con el mejor criterio posible; vale la pena que el dueño los revise puntualmente:
  - **Camarones**: "Brochetas" y "A la Cucaracha" se asignaron a $300 (vs. $250 del resto); "Pelados" se dividió en chico $265 / grande $300.
  - **Bebidas**: "Margarita Fresa 30-30" mostraba una nota adhesiva con "$120 / $70" superpuesta; se dejó en $120. "Coco" y "Rusa" no tenían precio individual claro y se asignaron $50 por continuidad con la fila anterior.
  - **Cerveza**: Pacífico en adelante (Corona Light, Modelo, Tecate, Tecate Light, Indio, XX Lager, Ultra, Bajo Cero, Miller, Strongbow Fresa) se asignaron a $40 seguiendo el patrón visual de la foto, aunque solo los primeros de ese grupo tenían el número explícito junto al nombre.
- "Pescado Frito" ahora indica "Precio según peso" en vez de precio fijo, tal como aparece en el menú físico.
- Se eliminó la categoría "Otros" (el ítem "Combinados" ahora vive dentro de "Camarones", como lo muestra el menú real).
- Se agregó la categoría "Tequila 30-30" (Blanco, Reposado, Añejo, Cristalino), nueva en el menú físico.
