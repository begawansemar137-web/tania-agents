"use client";

import { useState, type ReactNode } from "react";
import { Check, Code2, Copy } from "lucide-react";

const ENDPOINT = "https://tania-agents.vercel.app/api/chat";
const PROMPT = "Buat ringkasan prospek pelanggan hari ini";

// Examples call the real endpoint. It streams the answer as Server-Sent Events (AI SDK UI message stream).
const samples = {
  Python: `import requests

resp = requests.post(
    "${ENDPOINT}",
    json={
        "agentId": "sales-prep",
        "messages": [{"id": "1", "role": "user",
            "parts": [{"type": "text", "text": "${PROMPT}"}]}],
    },
    stream=True,
)
for line in resp.iter_lines(decode_unicode=True):
    if line.startswith("data: "):
        print(line[6:])`,
  JavaScript: `const res = await fetch("${ENDPOINT}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    agentId: "sales-prep",
    messages: [{ id: "1", role: "user",
      parts: [{ type: "text", text: "${PROMPT}" }] }],
  }),
});
const reader = res.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}`,
  cURL: `curl -N ${ENDPOINT} \\
  -H "Content-Type: application/json" \\
  -d '{
    "agentId": "sales-prep",
    "messages": [{"id": "1", "role": "user",
      "parts": [{"type": "text", "text": "${PROMPT}"}]}]
  }'`,
} as const;

type Lang = keyof typeof samples;

const TOKEN = /("[^"]*"|'[^']*'|`[^`]*`)|\b(import|from|for|in|if|const|await|while|break|true|print|curl)\b/g;

function highlight(line: string) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    out.push(
      <span key={m.index} className={m[1] ? "text-[#f5d76e]" : "text-[#c4a8ff]"}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return out;
}

export function CodeExample() {
  const [lang, setLang] = useState<Lang>("Python");
  const [copied, setCopied] = useState(false);
  const code = samples[lang];

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section aria-labelledby="code-title" className="flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-5">
      <h2 id="code-title" className="flex items-center gap-2.5 text-lg font-bold">
        <Code2 size={22} className="text-accent" aria-hidden="true" /> Code Example
      </h2>
      <div className="mt-4 flex items-center gap-2">
        <div role="tablist" aria-label="Bahasa" className="flex gap-1.5">
          {(Object.keys(samples) as Lang[]).map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={lang === l}
              onClick={() => setLang(l)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold ${lang === l ? "bg-accent text-surface" : "bg-surface-2 text-ink hover:text-accent"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <button onClick={copy} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:border-accent">
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
      <pre className="mt-3 flex-1 overflow-x-auto rounded-xl bg-[#17152b] p-4 font-mono text-[12.5px] leading-relaxed text-[#ecebf8]">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block">
              <span className="mr-4 inline-block w-5 text-right text-[#6f6b93] select-none">{i + 1}</span>
              {highlight(line)}
            </span>
          ))}
        </code>
      </pre>
    </section>
  );
}
