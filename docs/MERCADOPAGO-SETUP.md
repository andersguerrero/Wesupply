# Integración Mercado Pago

## 1. Crear aplicación en Mercado Pago

1. Entrá a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. **Tus integraciones** → **Crear aplicación**
3. Copiá el **Access Token** y **Public Key** (producción o pruebas)

## 2. Variables de entorno

En `.env.local`:

```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Para pruebas, usá las credenciales de **pruebas**.

## 3. Flujo (Checkout Bricks)

1. Usuario completa datos de envío y contacto
2. Click en **Ir a pagar** → POST `/api/mercadopago/checkout` crea preferencia
3. Se muestra el formulario de pago de Mercado Pago (Payment Brick) embebido
4. Usuario ingresa tarjeta y paga en la misma página
5. POST a `/api/mercadopago/process-payment` procesa el pago
6. Redirect a `/checkout/success` o mensaje de error

## 4. Precios

Los productos del catálogo deben tener precio en `variants[0].price.amount`. Actualmente el mock usa "0". Para producción, configurá precios reales en `lib/data/products-catalog.ts` o tu fuente de datos.
