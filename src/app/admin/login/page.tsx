"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al iniciar sesión");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-xl font-bold text-[#1a1a1a]">Acceso al panel</h1>
          <p className="mt-2 text-sm text-[#666]">
            Ingresá la contraseña para editar el contenido.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-[#333]">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[#ddd] px-4 py-3 focus:border-[var(--brand-primary,#2563eb)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary,#2563eb)]/20"
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-[#1a1a1a] py-3 font-medium text-white transition-colors hover:bg-[#333] disabled:opacity-60"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-[#999]">
          <Link href="/" className="hover:text-[#666]">← Volver al sitio</Link>
        </p>
      </div>
    </div>
  );
}
