# Despliegue en Railway

Guía para desplegar WESUPPLY en Railway y probar Mercado Pago.

---

## 1. Requisitos previos

- Cuenta en [Railway](https://railway.app)
- Repositorio en GitHub con el proyecto
- Credenciales de Mercado Pago (Access Token de prueba o producción)

---

## 2. Crear el proyecto en Railway

1. Entrá a [railway.app](https://railway.app) y creá una cuenta (o iniciá sesión).
2. **New Project** → **Deploy from GitHub repo**.
3. Conectá tu GitHub y elegí el repositorio de WESUPPLY.
4. Si el proyecto tiene varias carpetas: indicá la ruta del proyecto (ej. `wesupply-premium`) en **Root Directory**.

---

## 3. Variables de entorno

En el proyecto de Railway → tu servicio → **Variables** → agregar:

| Variable | Descripción |
|----------|-------------|
| `MERCADOPAGO_ACCESS_TOKEN` | Token de Mercado Pago (de tu app en [desarrolladores.mercadopago.com](https://www.mercadopago.com.ar/developers)) |
| `ADMIN_PASSWORD` | Contraseña para el admin (la misma que usás para loguearte) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (ej. `https://wesupply-xxx.up.railway.app`) |
| `CONTENT_DIR` | Solo si usás volumen: ruta donde montás el volume (ej. `/app/content`) |

**Importante:** `NEXT_PUBLIC_SITE_URL` debe ser la URL final de tu app en Railway para que el checkout y el webhook de MP funcionen bien.

---

## 4. Volumen persistente (recomendado)

Para que se guarden productos, pedidos, categorías y newsletter:

1. En tu servicio → **Volumes** → **Add Volume**.
2. **Mount Path:** `/app/content`
3. En Variables, agregar:  
   `CONTENT_DIR=/app/content`
4. Guardá los cambios.

Si no agregás volumen, los datos se pierden en cada deploy.

---

## 5. Dominio y URL pública

1. Servicio → **Settings** → **Networking** → **Generate Domain**.
2. Copiá la URL (ej. `wesupply-premium-production.up.railway.app`).
3. Actualizá la variable `NEXT_PUBLIC_SITE_URL` con esa URL (con `https://`).

---

## 6. Webhook de Mercado Pago

El webhook queda en:

```
https://TU-DOMINIO.up.railway.app/api/mercadopago/webhook
```

Opcional: configurarlo en [Desarrolladores de Mercado Pago](https://www.mercadopago.com.ar/developers/panel/app) → tu app → Webhooks / IPN.  
Aun sin configurarlo ahí, el `notification_url` enviado en el checkout hará que MP llame a tu URL.

---

## 7. Contenido inicial (productos, categorías)

Si usás volumen, la carpeta `content/` empieza vacía. Podés:

- **Opción A:** Ejecutá el seed localmente y subí los archivos a tu repo en `content/`.
- **Opción B:** Usá el admin en producción para cargar productos y categorías.
- **Opción C:** Ejecutá `npx tsx scripts/seed-content.ts` localmente, subí `content/*.json` a Git y volvé a hacer deploy.

---

## 8. Deploy

Después de conectar el repo y configurar variables:

- Cada push a la rama principal hace un deploy automático.
- Podés ver logs en **Deployments** → último deploy → **View Logs**.

---

## 9. Probar Mercado Pago

1. En el panel de MP, usá credenciales de **prueba** (sandbox) si querés testear.
2. [Usuarios de prueba MP](https://www.mercadopago.com.ar/developers/es/docs/checkout-bricks/additional-content/test-users): podés simular comprador y vendedor.
3. Hacé un pedido de prueba en tu sitio.
4. Verificá que el webhook se ejecute (logs en Railway) y que el pedido aparezca en **Admin → Pedidos**.

---

## Comandos útiles

```bash
# Instalar Railway CLI (opcional)
npm i -g @railway/cli

# Login
railway login

# Ver logs en vivo
railway logs
```
