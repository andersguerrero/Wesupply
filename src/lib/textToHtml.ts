/**
 * Convierte texto plano editado en el admin a HTML para mostrar en la página.
 * - Párrafos separados por línea en blanco
 * - Líneas "1. Título", "2. Título" → títulos (h2), el párrafo siguiente va junto
 * - [texto](url) → enlaces; emails y URLs se convierten automáticamente
 * - Si el contenido empieza con <, se asume HTML legacy y se devuelve tal cual
 */
export function textToHtml(text: string): string {
  const t = text.trim();
  if (!t) return "";
  if (t.startsWith("<")) return t;
  const rawBlocks = t.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const blocks: string[] = [];
  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i];
    const next = rawBlocks[i + 1];
    const isHeading = /^\d+\.\s+.+/.test(block);
    const nextIsHeading = next && /^\d+\.\s+.+/.test(next);
    if (isHeading && next && !nextIsHeading) {
      blocks.push(block + "\n\n" + next);
      i++;
    } else {
      blocks.push(block);
    }
  }
  const html: string[] = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    const firstLine = lines[0];
    const rest = lines.slice(1).join("\n").trim();
    const headingMatch = firstLine.match(/^(\d+)\.\s+(.+)$/);
    if (headingMatch) {
      html.push(`<section><h2>${escapeHtml(headingMatch[2])}</h2>`);
      if (rest) {
        html.push(`<p>${paragraphToHtml(rest)}</p>`);
      }
      html.push("</section>");
    } else {
      html.push(`<section><p>${paragraphToHtml(block)}</p></section>`);
    }
  }
  return html.join("\n");
}

function paragraphToHtml(para: string): string {
  let s = escapeHtml(para);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--brand-primary)] hover:underline">$1</a>');
  s = s.replace(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="text-[var(--brand-primary)] hover:underline">$1</a>');
  s = s.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-[var(--brand-primary)] hover:underline" target="_blank" rel="noopener">$1</a>');
  return s.replace(/\n/g, "<br>");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
