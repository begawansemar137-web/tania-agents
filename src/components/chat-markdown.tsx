import { Fragment, type ReactNode } from "react";

// Small markdown renderer for chat replies: headings, bullet/numbered lists, **bold**, *italic*, `code`.
// It builds React elements only (no innerHTML), so model output can't inject markup.

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={m.index} className="font-semibold">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={m.index} className="rounded bg-surface-2 px-1 font-mono text-[0.9em]">{t.slice(1, -1)}</code>);
    else out.push(<em key={m.index}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block =
  | { kind: "h"; text: string }
  | { kind: "p"; lines: string[] }
  | { kind: "ul" | "ol"; items: string[] };

export function ChatMarkdown({ text }: { text: string }) {
  const blocks: Block[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    const prev = blocks[blocks.length - 1];
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const num = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    const head = /^\s*#{1,6}\s+(.*)$/.exec(line);
    if (!line.trim()) {
      blocks.push({ kind: "p", lines: [] });
    } else if (head) {
      blocks.push({ kind: "h", text: head[1] });
    } else if (bullet) {
      if (prev?.kind === "ul") prev.items.push(bullet[1]);
      else blocks.push({ kind: "ul", items: [bullet[1]] });
    } else if (num) {
      if (prev?.kind === "ol") prev.items.push(num[1]);
      else blocks.push({ kind: "ol", items: [num[1]] });
    } else if (prev?.kind === "p") {
      prev.lines.push(line);
    } else {
      blocks.push({ kind: "p", lines: [line] });
    }
  }

  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        if (b.kind === "h") return <p key={i} className="font-semibold">{inline(b.text)}</p>;
        if (b.kind !== "p") {
          const List = b.kind;
          return (
            <List key={i} className={`space-y-1 pl-5 ${List === "ul" ? "list-disc" : "list-decimal"}`}>
              {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
            </List>
          );
        }
        if (!b.lines.length) return null;
        return (
          <p key={i}>
            {b.lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
