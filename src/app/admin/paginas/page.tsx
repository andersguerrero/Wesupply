"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Link from "next/link";
import AdminImageField from "../components/AdminImageField";

type SiteContent = {
  homeHero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    trustText: string;
    heroImage: string;
  };
  trustBar?: { message: string };
  footer?: {
    address: string;
    shopLinks: { label: string; href: string }[];
    empresaLinks: { label: string; href: string }[];
    socialLinks: { label: string; href: string }[];
    newsletterTitle: string;
    newsletterDesc: string;
    legalLinks: { label: string; href: string }[];
    copyright: string;
    afipVerificationUrl?: string;
    afipLabel?: string;
  };
  termsContent?: string;
  privacyContent?: string;
  queOfrecemos?: {
    title: string;
    description: string;
    items: { title: string; desc: string; href: string }[];
    ctaText: string;
    ctaHref: string;
    image: string;
  };
  categoryBlocks?: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  meta?: { siteTitle: string; siteDescription: string };
  headerNav?: { label: string; href: string }[];
};

const DEFAULT_SITE: SiteContent = {
  homeHero: {
    headline: "",
    subheadline: "",
    ctaText: "Ver productos",
    ctaHref: "/cintas",
    trustText: "Pago seguro · MercadoPago",
    heroImage: "/images/hero/hero-embalaje.webp",
  },
  trustBar: { message: "ENVÍOS A TODO ARGENTINA" },
  footer: {
    address: "",
    shopLinks: [],
    empresaLinks: [],
    socialLinks: [],
    newsletterTitle: "Unite a nuestra comunidad",
    newsletterDesc: "",
    legalLinks: [],
    copyright: "Todos los derechos reservados.",
  },
  queOfrecemos: {
    title: "¿Qué te ofrecemos?",
    description: "",
    items: [],
    ctaText: "Explorar productos",
    ctaHref: "/cintas",
    image: "/images/hero/hero-logistica.webp",
  },
  categoryBlocks: {
    title: "Explorá por categoría",
    subtitle: "Combiná y sumá a tu carrito. Sin mínimos. Descuentos automáticos por volumen.",
    ctaText: "Ver categoría →",
  },
  meta: { siteTitle: "WESUPPLY", siteDescription: "" },
  termsContent: "",
  privacyContent: "",
  headerNav: [
    { label: "Cintas", href: "/cintas" },
    { label: "Paños y textiles", href: "/panos-textiles" },
    { label: "Tanzas", href: "/tanzas" },
    { label: "Etiquetas", href: "/etiquetas" },
    { label: "Embalaje", href: "/embalaje" },
    { label: "Exhibidores", href: "/exhibidores" },
    { label: "Mayoristas", href: "/mayoristas" },
    { label: "Contacto", href: "/contacto" },
  ],
};

const DEFAULT_TERMS_TEXT = `1. Aceptación de los términos

Al acceder y utilizar el sitio web de WESUPPLY y sus servicios, usted acepta quedar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de los mismos, le solicitamos que no utilice nuestros servicios.

2. Descripción del servicio

WESUPPLY ofrece productos de embalaje, cintas, protección, sellado y soluciones para envío a empresas y operaciones comerciales. La información de productos, precios y disponibilidad está sujeta a cambios sin previo aviso. Las órdenes están condicionadas a la confirmación de stock.

3. Pedidos y pagos

Los pedidos realizados a través del sitio o por otros canales quedan sujetos a confirmación. Los métodos de pago aceptados incluyen MercadoPago y transferencia bancaria, según las opciones disponibles al momento del checkout. Los precios se expresan en pesos argentinos (ARS) e incluyen IVA salvo indicación en contrario.

4. Envíos y entregas

Realizamos envíos a todo el país. Los plazos de entrega son estimados y pueden variar según el destino y la logística. En CABA y GBA ofrecemos opciones de envío sin costo a partir de montos determinados. El riesgo de la mercadería se transmite al comprador al momento de la entrega.

5. Devoluciones y reclamos

Las devoluciones y reclamos por productos defectuosos o errores de envío deben notificarse dentro del plazo que indiquemos en la confirmación del pedido. Se requieren pruebas fotográficas cuando corresponda. Las condiciones específicas se informan al momento de la compra.

6. Propiedad intelectual

El contenido del sitio (textos, imágenes, logotipos, diseños) es propiedad de WESUPPLY o de sus licenciantes. Queda prohibida su reproducción, distribución o uso comercial sin autorización previa por escrito.

7. Modificaciones

Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al publicarse en el sitio. El uso continuado del servicio constituye la aceptación de los términos vigentes.

8. Contacto

Para consultas sobre estos términos, puede contactarnos en info@wesupply.com.ar o visitar nuestra página de [contacto](/contacto).`;

const DEFAULT_PRIVACY_TEXT = `1. Responsable del tratamiento

WESUPPLY, con domicilio en Au. Cam. del Buen Ayre 4600, Galpón 55-9, José León Suárez, Buenos Aires, es el responsable del tratamiento de los datos personales que recopilamos a través de este sitio web y de los canales de contacto indicados.

2. Datos que recopilamos

Podemos recopilar datos como: nombre, correo electrónico, teléfono, dirección de facturación y envío, información de la empresa, datos de uso del sitio y cookies. Estos datos se obtienen cuando usted completa formularios, realiza consultas, realiza compras o se suscribe a nuestra comunicación.

3. Finalidad del tratamiento

Utilizamos sus datos para: procesar pedidos y gestionar la relación comercial, responder consultas, enviar información sobre productos y ofertas (con su consentimiento), cumplir obligaciones legales, mejorar nuestros servicios y la experiencia de usuario.

4. Base legal

El tratamiento se basa en el consentimiento cuando corresponda, la ejecución de un contrato, el cumplimiento de obligaciones legales o el interés legítimo de WESUPPLY en brindar y mejorar sus servicios. En Argentina, nos regimos por la Ley 25.326 de Protección de Datos Personales.

5. Compartir datos

No vendemos ni cedemos sus datos personales a terceros con fines comerciales. Podemos compartir información con proveedores de servicios necesarios para el funcionamiento del negocio (pagos, envíos, hosting) que actúan como encargados de tratamiento bajo contrato.

6. Cookies y tecnologías similares

Utilizamos cookies y tecnologías similares para el funcionamiento del sitio, recordar preferencias y analizar el uso. Puede configurar su navegador para rechazar cookies, aunque ello podría afectar algunas funcionalidades del sitio.

7. Sus derechos

Usted tiene derecho a acceder, rectificar, suprimir, oponerse al tratamiento y limitar el uso de sus datos personales. Para ejercer estos derechos o realizar consultas, puede contactarnos en info@wesupply.com.ar.

8. Seguridad y conservación

Implementamos medidas técnicas y organizativas para proteger sus datos frente a accesos no autorizados, pérdida o alteración. Conservamos los datos durante el tiempo necesario para las finalidades indicadas o según exija la normativa aplicable.

9. Cambios

Nos reservamos el derecho de modificar esta política. Los cambios serán publicados en esta página con la fecha de actualización. Le recomendamos revisarla periódicamente.

10. Contacto

Para consultas sobre privacidad: info@wesupply.com.ar o [contacto](/contacto).`;

export default function AdminPaginasPage() {
  const [site, setSite] = useState<SiteContent>(DEFAULT_SITE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<
    "homeHero" | "headerNav" | "trustBar" | "categoryBlocks" | "footer" | "queOfrecemos" | "meta" | "terms" | "privacy" | "social" | "legal"
  >("homeHero");

  useAdminAuth();
  const load = () => {
    fetch("/api/admin/content?key=site")
      .then((r) => r.json())
      .then((data) => {
        setSite({
          ...DEFAULT_SITE,
          ...data,
          termsContent: (data?.termsContent ?? "").trim() || DEFAULT_TERMS_TEXT,
          privacyContent: (data?.privacyContent ?? "").trim() || DEFAULT_PRIVACY_TEXT,
          headerNav: Array.isArray(data?.headerNav) && data.headerNav.length > 0 ? data.headerNav : DEFAULT_SITE.headerNav,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content?key=site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(site),
      });
      if (!res.ok) throw new Error("Error al guardar");
      setMessage({ type: "ok", text: "Cambios guardados" });
    } catch {
      setMessage({ type: "error", text: "No se pudo guardar" });
    } finally {
      setSaving(false);
    }
  };

  const update = <K extends keyof SiteContent>(
    key: K,
    value: SiteContent[K]
  ) => {
    setSite((s) => ({ ...s, [key]: value }));
  };

  const updateRoot = (key: "termsContent" | "privacyContent", value: string) => {
    setSite((s) => ({ ...s, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[#666]">Cargando…</p>
      </div>
    );
  }

  const tabs = [
    { id: "homeHero" as const, label: "Portada (Hero)" },
    { id: "headerNav" as const, label: "Menú principal" },
    { id: "trustBar" as const, label: "Barra de promoción" },
    { id: "categoryBlocks" as const, label: "Explorar categorías" },
    { id: "queOfrecemos" as const, label: "¿Qué ofrecemos?" },
    { id: "footer" as const, label: "Pie de página" },
    { id: "social" as const, label: "Redes sociales" },
    { id: "legal" as const, label: "Términos y privacidad (links)" },
    { id: "terms" as const, label: "Términos de servicio" },
    { id: "privacy" as const, label: "Política de privacidad" },
    { id: "meta" as const, label: "SEO / Meta" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <Link href="/admin" className="text-sm text-[#666] hover:text-[#1a1a1a]">
          ← Panel
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]">Páginas del sitio</h1>
        <p className="mt-1 text-[#666]">
          Editá los textos e imágenes de las secciones principales.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 ${
            message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeSection === tab.id
                ? "bg-[#1a1a1a] text-white"
                : "bg-white text-[#666] shadow-sm hover:bg-[#f5f5f5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        {activeSection === "homeHero" && site.homeHero && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Portada principal</h2>
            <Field
              label="Título grande"
              value={site.homeHero.headline}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, headline: v })
              }
            />
            <Field
              label="Subtítulo"
              value={site.homeHero.subheadline}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, subheadline: v })
              }
              textarea
            />
            <Field
              label="Texto del botón"
              value={site.homeHero.ctaText}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, ctaText: v })
              }
            />
            <Field
              label="Enlace del botón"
              value={site.homeHero.ctaHref}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, ctaHref: v })
              }
            />
            <Field
              label="Texto de confianza (p. ej. Pago seguro)"
              value={site.homeHero.trustText}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, trustText: v })
              }
            />
            <AdminImageField
              label="Imagen del hero"
              value={site.homeHero.heroImage ?? ""}
              onChange={(v) =>
                update("homeHero", { ...site.homeHero!, heroImage: v })
              }
              folder="hero"
            />
          </div>
        )}

        {activeSection === "headerNav" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Menú principal (header)</h2>
            <p className="text-sm text-[#666]">
              Enlaces del menú de navegación del header. Podés agregar, quitar y reordenar. Los que apunten a una categoría (ej. /cintas) muestran el dropdown con productos automáticamente.
            </p>
            <LinkListEditor
              items={site.headerNav ?? []}
              onChange={(items) => update("headerNav", items)}
              emptyLabel="Cintas, Paños, Mayoristas, Contacto..."
              itemLabelPlaceholder="Ej: Cintas"
              itemHrefPlaceholder="/cintas"
            />
          </div>
        )}

        {activeSection === "trustBar" && site.trustBar && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Barra de promoción (arriba)</h2>
            <Field
              label="Mensaje que se repite"
              value={site.trustBar.message}
              onChange={(v) => update("trustBar", { message: v })}
            />
          </div>
        )}

        {activeSection === "categoryBlocks" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Explorar categorías (Home)</h2>
            <p className="text-sm text-[#666]">
              Título, subtítulo y texto del botón de cada tarjeta de categoría.
            </p>
            <Field
              label="Título de la sección"
              value={site.categoryBlocks?.title ?? ""}
              onChange={(v) =>
                update("categoryBlocks", {
                  ...(site.categoryBlocks ?? { title: "", subtitle: "", ctaText: "Ver categoría →" }),
                  title: v,
                })
              }
            />
            <Field
              label="Subtítulo"
              value={site.categoryBlocks?.subtitle ?? ""}
              onChange={(v) =>
                update("categoryBlocks", {
                  ...(site.categoryBlocks ?? { title: "", subtitle: "", ctaText: "Ver categoría →" }),
                  subtitle: v,
                })
              }
              textarea
            />
            <Field
              label="Texto del botón en cada tarjeta"
              value={site.categoryBlocks?.ctaText ?? ""}
              onChange={(v) =>
                update("categoryBlocks", {
                  ...(site.categoryBlocks ?? { title: "", subtitle: "", ctaText: "Ver categoría →" }),
                  ctaText: v,
                })
              }
            />
          </div>
        )}

        {activeSection === "queOfrecemos" && site.queOfrecemos && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sección ¿Qué te ofrecemos?</h2>
            <Field
              label="Título"
              value={site.queOfrecemos.title}
              onChange={(v) =>
                update("queOfrecemos", { ...site.queOfrecemos!, title: v })
              }
            />
            <Field
              label="Descripción"
              value={site.queOfrecemos.description}
              onChange={(v) =>
                update("queOfrecemos", { ...site.queOfrecemos!, description: v })
              }
              textarea
            />
            <Field
              label="Texto del botón"
              value={site.queOfrecemos.ctaText}
              onChange={(v) =>
                update("queOfrecemos", { ...site.queOfrecemos!, ctaText: v })
              }
            />
            <AdminImageField
              label="Imagen"
              value={site.queOfrecemos.image ?? ""}
              onChange={(v) =>
                update("queOfrecemos", { ...site.queOfrecemos!, image: v })
              }
              folder="hero"
            />
            <p className="text-sm text-[#666]">
              Los items (Cintas, Protección, etc.) se editan en categorías o
              añadiendo más campos en el JSON si hace falta.
            </p>
          </div>
        )}

        {activeSection === "footer" && site.footer && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Pie de página</h2>
            <Field
              label="Dirección (cada línea con Enter)"
              value={site.footer.address}
              onChange={(v) =>
                update("footer", { ...site.footer!, address: v })
              }
              textarea
            />
            <Field
              label="Título de newsletter"
              value={site.footer.newsletterTitle}
              onChange={(v) =>
                update("footer", { ...site.footer!, newsletterTitle: v })
              }
            />
            <Field
              label="Descripción de newsletter"
              value={site.footer.newsletterDesc}
              onChange={(v) =>
                update("footer", { ...site.footer!, newsletterDesc: v })
              }
            />
            <Field
              label="Copyright (ej: Todos los derechos reservados)"
              value={site.footer.copyright}
              onChange={(v) =>
                update("footer", { ...site.footer!, copyright: v })
              }
            />
            <div className="rounded-lg border border-[#ddd] bg-[#f9f9f9] p-4">
              <h3 className="text-sm font-semibold text-[#333]">Data Fiscal AFIP</h3>
              <p className="mt-1 text-xs text-[#666]">
                Pegá la URL de verificación de AFIP o solo el CUIT (11 dígitos). Si ingresás solo el CUIT, se generará el link automáticamente.
              </p>
              <Field
                label="URL o CUIT"
                value={site.footer.afipVerificationUrl ?? ""}
                onChange={(v) =>
                  update("footer", { ...site.footer!, afipVerificationUrl: v || undefined })
                }
                placeholder="https://... o 20123456789"
              />
              <Field
                label="Texto del enlace (opcional)"
                value={site.footer.afipLabel ?? ""}
                onChange={(v) =>
                  update("footer", { ...site.footer!, afipLabel: v || undefined })
                }
                placeholder="Ver datos fiscales AFIP"
              />
            </div>
          </div>
        )}

        {activeSection === "social" && site.footer && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Redes sociales</h2>
            <p className="text-sm text-[#666]">
              Enlaces a redes sociales que aparecen en el pie de página.
            </p>
            <LinkListEditor
              items={site.footer.socialLinks ?? []}
              onChange={(items) =>
                update("footer", { ...site.footer!, socialLinks: items })
              }
              emptyLabel="Instagram, TikTok, LinkedIn..."
              itemLabelPlaceholder="Ej: Instagram"
              itemHrefPlaceholder="https://..."
            />
          </div>
        )}

        {activeSection === "legal" && site.footer && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Enlaces legales</h2>
            <p className="text-sm text-[#666]">
              Links del footer (Términos, Privacidad). La URL suele ser /terminos y /privacidad.
            </p>
            <LinkListEditor
              items={site.footer.legalLinks ?? []}
              onChange={(items) =>
                update("footer", { ...site.footer!, legalLinks: items })
              }
              emptyLabel="Términos de servicio, Política de privacidad..."
              itemLabelPlaceholder="Ej: Términos de servicio"
              itemHrefPlaceholder="/terminos"
            />
          </div>
        )}

        {activeSection === "terms" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Términos de servicio</h2>
            <p className="text-sm text-[#666]">
              Editá el texto con normalidad. Dejá una línea en blanco entre párrafos. Las líneas que empiezan con "1. ", "2. ", etc. se muestran como títulos. Los emails y links se convierten automáticamente.
            </p>
            <Field
              label="Contenido"
              value={site.termsContent ?? ""}
              onChange={(v) => updateRoot("termsContent", v)}
              textarea
              rows={20}
            />
          </div>
        )}

        {activeSection === "privacy" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Política de privacidad</h2>
            <p className="text-sm text-[#666]">
              Editá el texto con normalidad. Línea en blanco entre párrafos. "1. ", "2. ", etc. para títulos. Emails y links se convierten solos.
            </p>
            <Field
              label="Contenido"
              value={site.privacyContent ?? ""}
              onChange={(v) => updateRoot("privacyContent", v)}
              textarea
              rows={20}
            />
          </div>
        )}

        {activeSection === "meta" && site.meta && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">SEO y metadatos</h2>
            <Field
              label="Título del sitio"
              value={site.meta.siteTitle}
              onChange={(v) =>
                update("meta", { ...site.meta!, siteTitle: v })
              }
            />
            <Field
              label="Descripción (para buscadores)"
              value={site.meta.siteDescription}
              onChange={(v) =>
                update("meta", { ...site.meta!, siteDescription: v })
              }
              textarea
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-[#1a1a1a] px-6 py-3 font-medium text-white hover:bg-[#333] disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const base =
    "mt-1 w-full rounded-lg border border-[#ddd] px-3 py-2 focus:border-[#1a1a1a] focus:outline-none";
  return (
    <div>
      <label className="block text-sm font-medium text-[#333]">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}

function LinkListEditor({
  items,
  onChange,
  emptyLabel,
  itemLabelPlaceholder,
  itemHrefPlaceholder,
}: {
  items: { label: string; href: string }[];
  onChange: (items: { label: string; href: string }[]) => void;
  emptyLabel: string;
  itemLabelPlaceholder: string;
  itemHrefPlaceholder: string;
}) {
  const updateItem = (i: number, field: "label" | "href", v: string) => {
    const next = [...(items || [])];
    if (!next[i]) next[i] = { label: "", href: "" };
    next[i] = { ...next[i], [field]: v };
    onChange(next);
  };
  const add = () => onChange([...(items || []), { label: "", href: "" }]);
  const remove = (i: number) => onChange((items || []).filter((_, j) => j !== i));
  const list = items?.length ? items : [];
  return (
    <div className="space-y-3">
      {list.map((item, i) => (
        <div key={i} className="flex flex-wrap gap-2 rounded-lg border border-[#ddd] p-3">
          <input
            value={item.label}
            onChange={(e) => updateItem(i, "label", e.target.value)}
            placeholder={itemLabelPlaceholder}
            className="min-w-[140px] flex-1 rounded border border-[#ddd] px-3 py-2 text-sm"
          />
          <input
            value={item.href}
            onChange={(e) => updateItem(i, "href", e.target.value)}
            placeholder={itemHrefPlaceholder}
            className="min-w-[140px] flex-1 rounded border border-[#ddd] px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-sm text-red-600 hover:underline"
          >
            Quitar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-[var(--brand-primary,#2563eb)] hover:underline"
      >
        + Agregar
      </button>
      {list.length === 0 && (
        <p className="text-sm text-[#666]">{emptyLabel}</p>
      )}
    </div>
  );
}
