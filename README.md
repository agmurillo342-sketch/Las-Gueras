# Restaurante Las Güeras — sitio web

Sitio estático (HTML/CSS/JS puro, sin backend ni frameworks) para la marisquería. Mobile-first, con navegación por menú, mapa embebido y botón flotante de WhatsApp.

## Cómo verlo

Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático (por ejemplo `npx serve .`).

## Estructura

```
index.html        Marcado completo (header, hero, menú, nosotros, footer)
css/styles.css     Estilos mobile-first, paleta inspirada en el mar
js/script.js       Menú móvil, pestañas activas del menú, año del footer
```

## Pendiente por completar (buscar "pendiente" / "$--" / "XXXXXXXXXX" en el código)

- Nombre exacto del negocio (se usó "Las Güeras" inferido del nombre del repositorio; confirmar).
- **Dirección en texto plano** (calle, colonia, ciudad, estado, CP). Ya tenemos el link corto de Google Maps (`https://maps.app.goo.gl/NESaxGmG6GVfdMAj8`) y se usó como botón "Ver en Google Maps" / "Cómo llegar", pero ese link no se pudo resolver automáticamente a una dirección de texto (el entorno donde corrió esta tarea bloquea el acceso saliente a dominios de Google). Faltan por llenar: el texto visible en la sección Nosotros/footer y los campos `streetAddress`/`addressLocality`/`addressRegion`/`postalCode` del JSON-LD en `index.html`.
- **Mapa embebido**: por ahora la sección "Nosotros" muestra una tarjeta con botón que abre Google Maps en una pestaña nueva (en vez de un iframe embebido), porque los links cortos de `maps.app.goo.gl` no se pueden insertar de forma confiable en un `<iframe>`. Cuando tengan la dirección en texto, se puede generar el iframe real desde Google Maps → Compartir → "Insertar un mapa" y pegar ese código en `index.html` (dentro de `.info-map`).
- Teléfono / WhatsApp real (reemplazar `521XXXXXXXXXX` en los 3 enlaces `wa.me` y `tel:`).
- Redes sociales (enlaces de Facebook/Instagram en el footer).
- Precios marcados con `$--`: Ostiones Zarandeados, Docena de Ostión, Balazo de Ostión, Callo de Hacha, Tiras de Atún, Molcajete de Aguachile, todos los Postres, Vinos y Licores, y Tequila 30-30 (no se veían en las fotos del menú proporcionadas).
- Imagen para `og:image` en las metaetiquetas Open Graph (opcional, mejora la vista previa al compartir el enlace).

## Horario

Se cargó "Todos los días: 9:00 a.m. – 8:00 p.m." en la sección Nosotros, el footer y el JSON-LD (`openingHoursSpecification`), asumiendo que el horario aplica los 7 días de la semana ya que no se especificaron días distintos. Si el restaurante cierra algún día o tiene horario distinto el fin de semana, avísame para ajustarlo.

## Notas sobre el menú (actualizado a partir de fotos del menú físico)

- La mayoría de los precios se tomaron directamente de las fotos del menú. Algunos números quedaron ambiguos por la alineación de la foto y se interpretaron con el mejor criterio posible; vale la pena que el dueño los revise puntualmente:
  - **Camarones**: "Brochetas" y "A la Cucaracha" se asignaron a $300 (vs. $250 del resto); "Pelados" se dividió en chico $265 / grande $300.
  - **Bebidas**: "Margarita Fresa 30-30" mostraba una nota adhesiva con "$120 / $70" superpuesta; se dejó en $120. "Coco" y "Rusa" no tenían precio individual claro y se asignaron $50 por continuidad con la fila anterior.
  - **Cerveza**: Pacífico en adelante (Corona Light, Modelo, Tecate, Tecate Light, Indio, XX Lager, Ultra, Bajo Cero, Miller, Strongbow Fresa) se asignaron a $40 seguiendo el patrón visual de la foto, aunque solo los primeros de ese grupo tenían el número explícito junto al nombre.
- "Pescado Frito" ahora indica "Precio según peso" en vez de precio fijo, tal como aparece en el menú físico.
- Se eliminó la categoría "Otros" (el ítem "Combinados" ahora vive dentro de "Camarones", como lo muestra el menú real).
- Se agregó la categoría "Tequila 30-30" (Blanco, Reposado, Añejo, Cristalino), nueva en el menú físico.
