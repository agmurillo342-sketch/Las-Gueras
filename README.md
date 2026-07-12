# Restaurante Las Güeras — sitio web

Sitio estático (HTML/CSS/JS puro, sin backend ni frameworks) para la marisquería. Mobile-first, con navegación tipo app por secciones, mapa embebido y botón flotante de WhatsApp.

## Navegación por secciones (app-like)

El sitio ya no es una página larga de scroll continuo: solo una sección ("página") está visible a la vez — Inicio, Menú, Nosotros o Contacto — y la única forma de moverse entre ellas es abriendo el menú de las tres líneas (☰) en la esquina superior derecha del header (funciona igual en móvil y escritorio). Cada sección es un panel a pantalla completa con su propio scroll interno; nunca se puede llegar a otra sección deslizando.

Al elegir una sección, la sección actual gira sobre su borde izquierdo como si fuera la página de un libro (transformación 3D con `perspective`/`rotateY`, ver `.pages-viewport` y `.page.is-leaving` en `css/styles.css`), revelando la nueva sección debajo. Al mismo tiempo, un pez rojo/naranja (`#fishTransition`, SVG inline en `index.html`) nada de un lado al otro de la pantalla como si "volteara" la página. Toda la orquestación vive en `js/script.js`, función `showPage`. Dentro de la sección "Menú" las pestañas de categorías (Bebidas, Camarones, etc.) siguen funcionando igual que antes, mostrando solo una categoría a la vez.

## Cómo verlo

Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático (por ejemplo `npx serve .`).

## Estructura

```
index.html        Marcado completo (header, secciones Inicio/Menú/Nosotros/Contacto)
css/styles.css     Estilos mobile-first, paleta cálida (rojo, naranja, dorado) inspirada en el logo
js/script.js       Navegación por secciones, menú del header, pestañas del menú, año del footer
assets/logo.png    Logo real del negocio (recortado a 512×512, fondo transparente)
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

## Notas sobre el menú (actualizado a partir de fotos del menú físico)

- La mayoría de los precios se tomaron directamente de las fotos del menú. Algunos números quedaron ambiguos por la alineación de la foto y se interpretaron con el mejor criterio posible; vale la pena que el dueño los revise puntualmente:
  - **Camarones**: "Brochetas" y "A la Cucaracha" se asignaron a $300 (vs. $250 del resto); "Pelados" se dividió en chico $265 / grande $300.
  - **Bebidas**: "Margarita Fresa 30-30" mostraba una nota adhesiva con "$120 / $70" superpuesta; se dejó en $120. "Coco" y "Rusa" no tenían precio individual claro y se asignaron $50 por continuidad con la fila anterior.
  - **Cerveza**: Pacífico en adelante (Corona Light, Modelo, Tecate, Tecate Light, Indio, XX Lager, Ultra, Bajo Cero, Miller, Strongbow Fresa) se asignaron a $40 seguiendo el patrón visual de la foto, aunque solo los primeros de ese grupo tenían el número explícito junto al nombre.
- "Pescado Frito" ahora indica "Precio según peso" en vez de precio fijo, tal como aparece en el menú físico.
- Se eliminó la categoría "Otros" (el ítem "Combinados" ahora vive dentro de "Camarones", como lo muestra el menú real).
- Se agregó la categoría "Tequila 30-30" (Blanco, Reposado, Añejo, Cristalino), nueva en el menú físico.
