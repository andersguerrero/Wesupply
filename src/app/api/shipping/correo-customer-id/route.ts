import { NextResponse } from "next/server";

/**
 * GET /api/shipping/correo-customer-id
 * Intenta obtener el customerId de Correo Argentino usando las credenciales de .env.local.
 * Llamar una vez y agregar el resultado a CORREO_ARGENTINO_CUSTOMER_ID.
 */
const API_BASE =
  process.env.CORREO_ARGENTINO_TEST === "1"
    ? "https://apitest.correoargentino.com.ar/micorreo/v1"
    : "https://api.correoargentino.com.ar/micorreo/v1";

export async function GET() {
  const user = process.env.CORREO_ARGENTINO_USER;
  const pass = process.env.CORREO_ARGENTINO_PASSWORD;
  if (!user || !pass) {
    return NextResponse.json(
      { error: "Configure CORREO_ARGENTINO_USER y CORREO_ARGENTINO_PASSWORD en .env.local" },
      { status: 400 }
    );
  }

  try {
    const auth = Buffer.from(`${user}:${pass}`).toString("base64");
    const tokenRes = await fetch(`${API_BASE}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      return NextResponse.json(
        { error: `Token falló: ${tokenRes.status}`, detail: text },
        { status: 502 }
      );
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    const token = tokenData.access_token;
    if (!token) {
      return NextResponse.json({ error: "No se obtuvo access_token" }, { status: 502 });
    }

    const validateRes = await fetch(`${API_BASE}/users/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user, password: pass }),
    });

    const validateData = (await validateRes.json()) as { customerId?: string; id?: string };
    const customerId = validateData.customerId ?? validateData.id ?? (validateData as Record<string, unknown>).customer_id;

    if (!customerId) {
      return NextResponse.json(
        {
          error: "No se encontró customerId en la respuesta. La API puede usar otro formato.",
          response: validateData,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      customerId: String(customerId),
      message: "Agregá a .env.local: CORREO_ARGENTINO_CUSTOMER_ID=" + String(customerId),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error al conectar con Correo Argentino" },
      { status: 500 }
    );
  }
}
