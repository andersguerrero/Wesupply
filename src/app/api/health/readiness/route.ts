/**
 * GET /api/health/readiness
 * Verifica que el checklist de producción esté completo.
 * Útil para monitoreo o verificación post-deploy.
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const isVercel = !!process.env.VERCEL;

  const checks = {
    mercadopago: !!process.env.MERCADOPAGO_ACCESS_TOKEN?.trim(),
    siteUrl: !!baseUrl && baseUrl.startsWith("http") && !baseUrl.endsWith("/"),
    blob: !!process.env.BLOB_READ_WRITE_TOKEN?.trim(),
  };

  const allOk = checks.mercadopago && checks.siteUrl && (checks.blob || !isVercel);

  return Response.json(
    {
      ready: allOk,
      checks,
      webhookUrl: baseUrl ? `${baseUrl.replace(/\/$/, "")}/api/mercadopago/webhook` : null,
    },
    { status: allOk ? 200 : 503 }
  );
}
