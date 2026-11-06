import { agents, getAgent, type Agent } from "./data";
import { catalog, type CatalogAgent, type CatalogIcon } from "./catalog";

// Every catalog entry must open a working agent. Entries with their own studio (`agentId`) use it;
// the rest get an agent built from the catalog description, so they can chat right away.

const emoji: Record<CatalogIcon, string> = {
  sales: "📞", marketing: "📣", customer: "🎧", hr: "🧭", finance: "🧾", code: "💻",
  data: "📊", operations: "⚙️", compliance: "🛡️", lead: "📥", research: "🔎", meeting: "🗓️",
};

export function agentFromCatalog(c: CatalogAgent): Agent {
  return {
    id: c.slug,
    name: c.name,
    role: c.desc,
    emoji: emoji[c.icon],
    model: "auto",
    owner: "Template katalog",
    channels: ["Web"],
    instructions:
      `Kamu adalah ${c.name}. ${c.desc}\nTugas utama: ${c.brief}\nFokus: ${c.tags.join(", ")}.\n` +
      "Berikan jawaban yang langsung bisa dipakai (draf, daftar langkah, atau ringkasan). Jika butuh data internal, minta pengguna menempelkannya.",
    skills: c.tags,
    tools: [],
    versions: [{ version: 1, date: c.added, author: "TANIA", note: "Template dari katalog" }],
    runsThisWeek: 0,
    costThisWeek: 0,
    status: "aktif",
    greeting: `Halo! Saya ${c.name}. ${c.desc} Apa yang bisa saya bantu?`,
    starters: [c.brief, "Apa saja yang bisa kamu bantu?"],
  };
}

/** Built-in studio agent by id, or a catalog agent by slug. */
export function findAgent(id: string): Agent | undefined {
  const own = getAgent(id);
  if (own) return own;
  const c = catalog.find((x) => x.slug === id && !x.agentId);
  return c ? agentFromCatalog(c) : undefined;
}

export const allAgentIds = [...agents.map((a) => a.id), ...catalog.filter((c) => !c.agentId).map((c) => c.slug)];

/** Link target for a catalog card: its studio, or its own catalog agent page. */
export const catalogHref = (c: CatalogAgent) => `/app/agents/${c.agentId ?? c.slug}`;

// A user-made agent from /app/agents/new. It lives only in the browser (demo), so the chat API
// receives its name and role with each request under the reserved id "custom".
export const CUSTOM_AGENT_ID = "custom";

export function customAgent(description: string, name = "Agen Kustom"): Agent {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: CUSTOM_AGENT_ID,
    name,
    role: description,
    emoji: "✨",
    model: "auto",
    owner: "Anda",
    channels: ["Web"],
    instructions:
      `Pekerjaanmu: ${description}\n` +
      "Bantu pengguna menyelesaikan pekerjaan ini langkah demi langkah. Jika butuh data atau akses aplikasi, minta pengguna menempelkan datanya.",
    skills: [],
    tools: [],
    versions: [{ version: 1, date: today, author: "Anda", note: "Dibuat lewat obrolan" }],
    runsThisWeek: 0,
    costThisWeek: 0,
    status: "draf",
    greeting: `Halo! Saya siap membantu: “${description}”. Mau mulai dari mana?`,
    starters: ["Mulai kerjakan tugas ini", "Data apa yang kamu butuhkan dari saya?"],
  };
}
