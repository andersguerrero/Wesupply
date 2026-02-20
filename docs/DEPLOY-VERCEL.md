# Despliegue en Vercel

Guía para desplegar WESUPPLY en Vercel con persistencia en Vercel Blob.

---

## Checklist para producción

Después del deploy, verificá que todo funcione llamando a:

```
GET /api/health/readiness
```

Debe devolver `200` con `ready: true` y todas las verificaciones en verde:

| Check | Descripción |
|-------|-------------|
| `mercadopago` | `MERCADOPAGO_ACCESS_TOKEN` configurado |
| `siteUrl` | `NEXT_PUBLIC_SITE_URL` correcta (https, sin `/` final) |
| `blob` | `BLOB_READ_WRITE_TOKEN` configurado para persistir pedidos |
| `webhookUrl` | URL del webhook (debe ser accesible públicamente) |

**Variables obligatorias en Vercel:**

- `MERCADOPAGO_ACCESS_TOKEN` — Token de producción o sandbox según el caso
- `NEXT_PUBLIC_SITE_URL` — URL real del deploy, ej: `https://tu-proyecto.vercel.app` (sin `/` final)
- `BLOB_READ_WRITE_TOKEN` — Se agrega al crear el Blob Store
- El webhook es alcanzable porque Vercel expone el sitio por HTTPS

---

## 1. Requisitos previos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub con el proyecto
- Credenciales de Mercado Pago

---

## 2. Crear Blob Store en Vercel

1. Entrá a [Vercel Dashboard](https://vercel.com/dashboard) → tu proyecto (o crealo primero).
2. **Storage** → **Create Database** → **Blob**.
3. Nombre: `wesupply-content` (o el que prefieras).
4. **Create**. Vercel agrega `BLOB_READ_WRITE_TOKEN` automáticamente al proyecto.

---

## 3. Crear el proyecto en Vercel

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
2. Conectá GitHub y elegí el repo de WESUPPLY.
3. **Root Directory:** `wesupply-premium` (si el repo tiene la app en esa carpeta).
4. **Framework Preset:** Next.js (auto-detectado).

---

## 4. Variables de entorno

En **Settings** → **Environment Variables** agregar:

| Variable | Valor |
|----------|-------|
| `BLOB_READ_WRITE_TOKEN` | Se agrega solo al crear el Blob Store |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de tu app en Mercado Pago |
| `ADMIN_PASSWORD` | Contraseña del admin |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-proyecto.vercel.app` (ajustar después del primer deploy) |

---

## 5. Deploy

1. **Deploy**.
2. Esperá a que termine el build.
3. Copiá la URL de producción.
4. Actualizá `NEXT_PUBLIC_SITE_URL` con esa URL y volvé a hacer deploy.

---

## 6. Contenido inicial

En el primer deploy, Vercel Blob estará vacío. Opciones:

- **Opción A:** Usá el admin para cargar productos, categorías y contenido.
- **Opción B:** Ejecutá `npx tsx scripts/seed-content.ts` localmente, subí los archivos `content/*.json` al repo y desplegá. Luego, en producción, el admin escribirá en Blob (los archivos de Git solo sirven como seed inicial; una vez en Blob, se usan esos datos).

---

## 7. Webhook de Mercado Pago

URL del webhook:

```
https://TU-DOMINIO.vercel.app/api/mercadopago/webhook
```

Opcional: configurarla en [Desarrolladores MP](https://www.mercadopago.com.ar/developers/panel/app). El `notification_url` del checkout ya apunta a esta URL.

---

## 8. Comportamiento del store

- **Con `BLOB_READ_WRITE_TOKEN`:** Los datos (productos, pedidos, categorías, etc.) se guardan en Vercel Blob.
- **Sin token (local):** Se usa la carpeta `content/` en disco.
