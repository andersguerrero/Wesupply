"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminPage() {
  useAdminAuth();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Panel de administración</h1>
        <p className="mt-1 text-[#666]">Editá todo el contenido de tu página desde acá.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/productos"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>📦</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Productos</h2>
          <p className="text-sm text-[#666]">
            Agregar, editar o eliminar productos. Imágenes, precios y descripciones.
          </p>
        </Link>

        <Link
          href="/admin/categorias"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>📁</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Categorías</h2>
          <p className="text-sm text-[#666]">
            Títulos, descripciones, imágenes de hero y FAQ por categoría.
          </p>
        </Link>

        <Link
          href="/admin/paginas"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>📄</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Páginas del sitio</h2>
          <p className="text-sm text-[#666]">
            Hero, barra de promoción, footer, sección ¿Qué ofrecemos? y más.
          </p>
        </Link>

        <Link
          href="/admin/newsletter"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>✉️</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Newsletter</h2>
          <p className="text-sm text-[#666]">
            Ver suscriptores al newsletter del footer.
          </p>
        </Link>

        <Link
          href="/admin/pedidos"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>🛒</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Pedidos</h2>
          <p className="text-sm text-[#666]">
            Ver pedidos confirmados por Mercado Pago.
          </p>
        </Link>

        <Link
          href="/admin/envios"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>🚚</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Envíos</h2>
          <p className="text-sm text-[#666]">
            Precios por zona CABA y GBA (estilo Mercado Libre Flex).
          </p>
        </Link>

        <Link
          href="/admin/resenas"
          className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-3xl" aria-hidden>⭐</span>
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Reseñas</h2>
          <p className="text-sm text-[#666]">
            Editar reseñas de clientes (home y páginas de producto).
          </p>
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#666] underline hover:text-[#1a1a1a]"
        >
          Ver sitio →
        </a>
        <button
          type="button"
          onClick={async () => {
              await fetch("/api/admin/auth", { method: "DELETE" });
              window.location.href = "/admin/login";
          }}
          className="text-sm text-[#999] hover:text-[#666]"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
