# Integración Mercado Pago

## 1. Crear aplicación en Mercado Pago

1. Entrá a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. **Tus integraciones** → **Crear aplicación**
3. Copiá el **Access Token** (producción o pruebas)

## 2. Variables de entorno

En `.env.local`:

```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Para pruebas, usá el token de **pruebas** (empieza con `TEST-`).

## 3. Flujo

1. Usuario agrega productos al carrito (localStorage)
2. Click en **Finalizar compra** → POST `/api/mercadopago/checkout`
3. Se crea una preferencia en Mercado Pago
4. Redirect a `init_point` (Checkout Pro de MP)
5. Usuario paga en Mercado Pago
6. Redirect de vuelta a tu sitio (back_urls)

## 4. Precios

Los productos del catálogo deben tener precio en `variants[0].price.amount`. Actualmente el mock usa "0". Para producción, configurá precios reales en `lib/data/products-catalog.ts` o tu fuente de datos.
