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
- Precios marcados con `$--` en todas las secciones del menú excepto Bebidas (ya vienen con precios reales).
- Imagen para `og:image` en las metaetiquetas Open Graph (opcional, mejora la vista previa al compartir el enlace).
