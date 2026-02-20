# Panel de administración

Panel para editar todo el contenido del sitio sin tocar código.

## Acceso

- **URL:** `/admin`
- **Login:** Si configurás `ADMIN_PASSWORD` en `.env.local`, se pedirá contraseña al entrar.
- Sin contraseña configurada, el acceso es libre (útil para desarrollo local).

## Secciones

### Productos
- Ver y editar todos los productos
- **General:** SKU, categoría, título, imágenes, precio
- **Descripción:** Subtítulo (bajo el título) y descripción larga
- **Especificaciones:** Tabla técnia (clave–valor). El SKU se agrega automáticamente
- **FAQ:** Preguntas y respuestas frecuentes del producto
- **Aplicaciones:** Usos del producto (título + descripción corta)
- **Imágenes:** Múltiples por producto — subir varias a la vez o agregar URL

### Categorías
- Título, descripción, hero (headline, subheadline, imagen)
- Aplicaciones y FAQ por categoría

### Páginas del sitio
- **Portada (Hero):** Título, subtítulo, botón, texto de confianza, imagen
- **Barra de promoción:** Mensaje que se repite arriba
- **Explorar categorías:** Título, subtítulo y texto del botón de cada tarjeta
- **¿Qué ofrecemos?:** Título, descripción, items, imagen
- **Pie de página:** Dirección, enlaces, newsletter, copyright
- **SEO / Meta:** Título y descripción del sitio

## Datos

Los cambios se guardan en archivos JSON en la carpeta `content/`:

- `content/products.json` — Productos
- `content/categories.json` — Categorías
- `content/site.json` — Contenido del sitio (hero, footer, etc.)

Podés versionar estos archivos con Git para tener historial de cambios.

## Notas

- Las imágenes se referencian por ruta (ej: `/images/products/x.webp`). Subir imágenes manualmente en `public/images/`.
- Si la carpeta `content/` no existe, ejecutá `npx tsx scripts/seed-content.ts` para generar los archivos iniciales.
