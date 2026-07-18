# Restaurante Las Güeras — sitio web

Sitio estático (HTML/CSS/JS puro, sin backend ni frameworks) para la marisquería. Mobile-first, con opiniones, indicador de abierto/cerrado, galería en ventana flotante, botón flotante de WhatsApp y un asistente de chat que responde preguntas frecuentes.

## Navegación

El sitio es una página larga de scroll normal: todas las secciones (Inicio, Menú, Opiniones, Nosotros, Contacto) están una debajo de otra y se ven deslizando con normalidad, como cualquier sitio de una sola página. La Galería no es una sección más: vive en una ventana flotante aparte (ver más abajo).

Además, el menú de las tres líneas (☰) en el header permite saltar directo a cualquier sección. Al elegir una sección desde ahí, un pez rojo/naranja (`#fishTransition`, SVG inline en `index.html`) cruza la pantalla como si "volteara la página" hacia esa sección, mientras el navegador hace scroll suave (`scroll-behavior: smooth`) hasta ella. Esta animación solo ocurre al usar el menú ☰; el scroll normal (con el dedo o la rueda del mouse) no la dispara. Toda la orquestación vive en `js/script.js` (`triggerFishSwim`, listeners sobre `.nav-link[data-page]`); el enlace activo en el menú también se resalta automáticamente según la sección visible mientras se hace scroll (`IntersectionObserver`).

Dentro de la sección "Menú" las pestañas de categorías (Bebidas, Camarones, etc.) quedan fijas (`position: sticky`) bajo el header mientras se recorre la lista de platillos, y muestran solo una categoría a la vez.

## Cómo verlo

Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático (por ejemplo `npx serve .`). Todo el sitio, incluido el asistente de chat, funciona así — no hay backend ni claves que configurar.

## Estructura

```
index.html          Marcado completo (header, secciones Inicio/Menú/Opiniones/Nosotros/Contacto, widget de chat, ventana de galería)
css/styles.css       Estilos mobile-first, paleta cálida (rojo, naranja, dorado) inspirada en el logo
js/script.js         Menú del header, scroll-spy, pez de transición, pestañas del menú, indicador abierto/cerrado, asistente de chat, ventana de galería, año del footer
assets/logo.png      Logo real del negocio (recortado a 512×512, fondo transparente)
assets/gallery/      10 fotos reales del restaurante mostradas en la ventana de Galería
```

## Logo y paleta de colores

Se reemplazó el logo genérico por el logo real proporcionado (círculo rojo-naranja con el texto "Las Güeras" en cursiva blanca y ramas doradas), usado en el header, el hero (con un resplandor animado detrás), el footer y como favicon/`apple-touch-icon`. La paleta de colores en `css/styles.css` se rediseñó por completo con tonos cálidos tomados del logo (rojo ember, naranja coral, dorado, negro-café oscuro) en vez de los azules de mar originales. También se agregaron detalles para hacer el sitio más llamativo: botones con degradado, resplandor pulsante en el logo del hero y en el botón flotante de WhatsApp, subrayado dorado bajo los títulos de sección, y efecto hover en las tarjetas del menú.

## Pendiente por completar (buscar "pendiente" / "$--" / "XXXXXXXXXX" en el código)

- Nombre exacto del negocio (se usó "Las Güeras" inferido del nombre del repositorio; confirmar).
- **Calle y número exactos**: ya se confirmó que el restaurante está en **Punta Pérula, Jalisco** (CP 48869, municipio de La Huerta) — cargado en el texto visible de "Nosotros" y en el JSON-LD (`addressLocality`, `addressRegion`, `postalCode`). Solo falta la calle/número puntual (`streetAddress` en el JSON-LD) si el negocio tiene una dirección postal formal; Punta Pérula es una localidad pequeña donde muchos negocios se ubican simplemente "sobre la playa" sin calle numerada, así que esto puede quedarse así si no aplica.
- **Mapa embebido**: por ahora la sección "Nosotros" muestra una tarjeta con botón que abre Google Maps en una pestaña nueva (en vez de un iframe embebido), porque los links cortos de `maps.app.goo.gl` no se pueden insertar de forma confiable en un `<iframe>`. Se puede generar el iframe real desde Google Maps → Compartir → "Insertar un mapa" y pegar ese código en `index.html` (dentro de `.info-map`).
- Precios marcados con `$--`: Callo de Hacha, Tiras de Atún, Molcajete de Aguachile, todos los Postres, Vinos y Licores, y Tequila 30-30 (no se veían en las fotos del menú proporcionadas).

## Horario y teléfono

Se cargó "Todos los días: 9:00 a.m. – 8:00 p.m." en la sección Nosotros, el footer y el JSON-LD (`openingHoursSpecification`), asumiendo que el horario aplica los 7 días de la semana ya que no se especificaron días distintos. Si el restaurante cierra algún día o tiene horario distinto el fin de semana, avísame para ajustarlo.

El teléfono/WhatsApp real (+52 315 109 0369) ya está cargado en todos los enlaces `tel:` y `wa.me`, y en el JSON-LD. Para los enlaces de WhatsApp se usó el formato `52` + 10 dígitos (sin el "1" extra que antes se usaba para celulares mexicanos), que es el formato vigente desde que México eliminó ese requisito en la marcación internacional.

Junto al horario (en "Nosotros" y en el footer) aparece un indicador de "Abierto ahora" / "Cerrado ahora" con un punto verde o rojo. Se calcula en el navegador del visitante (`js/script.js`, `updateOpenStatus`) comparando la hora local del dispositivo contra el rango 9:00–20:00; se recalcula cada minuto. Como usa la hora local del navegador, asume que el visitante está en la misma zona horaria que el restaurante — si reciben visitas de otros husos horarios y quieren fijar la zona exacta, avísenme para ajustarlo.

## Opiniones

Sección con la calificación general "3.9 ★" como título, y 3 reseñas reales de Google (Manuel Sosa, Cesar G y Carlos Asdrubal Perez Ceballo) con su calificación individual en estrellas. Si más adelante quieren mostrar reseñas distintas o actualizar la calificación, solo hay que editar el bloque `<section class="reviews-section" id="page-opiniones">` en `index.html`.

## Galería (ventana flotante)

La galería ya no es una sección del scroll: es un botón flotante naranja/carmesí (arriba del de WhatsApp y el del asistente) que abre una ventana con una cuadrícula de fotos, sin que las imágenes formen parte del recorrido normal de la página. Las 10 fotos actuales son fotos reales del restaurante y de bebidas/platillos en Punta Pérula, guardadas ya optimizadas en `assets/gallery/`.

Para cambiar las fotos: reemplaza los archivos en `assets/gallery/` y actualiza las etiquetas `<img>` dentro de `<div class="gallery-modal-grid">` en `index.html` (cada una necesita su `src` y un `alt` descriptivo). La ventana se abre/cierra con `js/script.js` (sección "Galería"), igual patrón que el chat: botón flotante + overlay + tecla Escape para cerrar.

## Asistente de chat

El botón redondo arriba del de WhatsApp abre un chat que responde dudas comunes de los visitantes: horario, ubicación, teléfono/WhatsApp, cómo reservar, y precios por categoría del menú (camarones, cerveza, tequila, etc.). Funciona completamente en el navegador, sin ningún servicio externo ni costo — no llama a ninguna API. Reconoce palabras clave en la pregunta del visitante (por ejemplo "horario", "ubicación", "camarones", "reservar") y responde con la información correspondiente; si no reconoce la pregunta, invita a escribir por WhatsApp.

Toda la lógica vive en `js/script.js` (sección "Asistente virtual"). Los precios y nombres de platillos los lee directamente del HTML del menú (`buildMenuIndex`), así que si edita el menú en `index.html` el asistente responde automáticamente con la info actualizada — no hay que tocar nada más. Las palabras clave que activan cada categoría están en el objeto `CATEGORY_KEYWORDS`; se pueden ampliar ahí si el asistente no reconoce alguna forma común de preguntar.

Como es un bot de reglas (no un modelo de lenguaje), no entiende preguntas complejas o fuera de este patrón — para esos casos, siempre ofrece el enlace directo de WhatsApp.

## Notas sobre el menú (actualizado a partir de fotos del menú físico)

- La mayoría de los precios se tomaron directamente de las fotos del menú. Algunos números quedaron ambiguos por la alineación de la foto y se interpretaron con el mejor criterio posible; vale la pena que el dueño los revise puntualmente:
  - **Camarones**: "Brochetas" y "A la Cucaracha" se asignaron a $300 (vs. $250 del resto); "Pelados" se dividió en chico $265 / grande $300.
  - **Bebidas**: "Margarita Fresa 30-30" mostraba una nota adhesiva con "$120 / $70" superpuesta; se dejó en $120. "Coco" y "Rusa" no tenían precio individual claro y se asignaron $50 por continuidad con la fila anterior.
  - **Cerveza**: Pacífico en adelante (Corona Light, Modelo, Tecate, Tecate Light, Indio, XX Lager, Ultra, Bajo Cero, Miller, Strongbow Fresa) se asignaron a $40 seguiendo el patrón visual de la foto, aunque solo los primeros de ese grupo tenían el número explícito junto al nombre.
- "Pescado Frito" ahora indica "Precio según peso" en vez de precio fijo, tal como aparece en el menú físico.
- Se eliminó la categoría "Otros" (el ítem "Combinados" ahora vive dentro de "Camarones", como lo muestra el menú real).
- Se agregó la categoría "Tequila 30-30" (Blanco, Reposado, Añejo, Cristalino), nueva en el menú físico.
