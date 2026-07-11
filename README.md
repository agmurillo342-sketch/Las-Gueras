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
- Dirección completa (`index.html`: sección Nosotros, footer, y datos estructurados JSON-LD).
- Teléfono / WhatsApp real (reemplazar `521XXXXXXXXXX` en los 3 enlaces `wa.me` y `tel:`).
- Horario de atención.
- Redes sociales (enlaces de Facebook/Instagram en el footer).
- Coordenadas o dirección exacta para el iframe de Google Maps (sección Nosotros).
- Precios marcados con `$--`: Ostiones Zarandeados, Docena de Ostión, Balazo de Ostión, Callo de Hacha, Tiras de Atún, Molcajete de Aguachile, todos los Postres, Vinos y Licores, y Tequila 30-30 (no se veían en las fotos del menú proporcionadas).
- Imagen para `og:image` en las metaetiquetas Open Graph (opcional, mejora la vista previa al compartir el enlace).

## Notas sobre el menú (actualizado a partir de fotos del menú físico)

- La mayoría de los precios se tomaron directamente de las fotos del menú. Algunos números quedaron ambiguos por la alineación de la foto y se interpretaron con el mejor criterio posible; vale la pena que el dueño los revise puntualmente:
  - **Camarones**: "Brochetas" y "A la Cucaracha" se asignaron a $300 (vs. $250 del resto); "Pelados" se dividió en chico $265 / grande $300.
  - **Bebidas**: "Margarita Fresa 30-30" mostraba una nota adhesiva con "$120 / $70" superpuesta; se dejó en $120. "Coco" y "Rusa" no tenían precio individual claro y se asignaron $50 por continuidad con la fila anterior.
  - **Cerveza**: Pacífico en adelante (Corona Light, Modelo, Tecate, Tecate Light, Indio, XX Lager, Ultra, Bajo Cero, Miller, Strongbow Fresa) se asignaron a $40 seguiendo el patrón visual de la foto, aunque solo los primeros de ese grupo tenían el número explícito junto al nombre.
- "Pescado Frito" ahora indica "Precio según peso" en vez de precio fijo, tal como aparece en el menú físico.
- Se eliminó la categoría "Otros" (el ítem "Combinados" ahora vive dentro de "Camarones", como lo muestra el menú real).
- Se agregó la categoría "Tequila 30-30" (Blanco, Reposado, Añejo, Cristalino), nueva en el menú físico.
