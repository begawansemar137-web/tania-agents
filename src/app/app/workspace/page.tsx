import { FileText, FolderOpen, LayoutGrid, MessageCircle } from "lucide-react";
import { Card, PageHeader, Badge } from "@/components/ui";

const files = [
  { name: "kompetitor.md", kind: "doc", by: "Raka (agen)", updated: "03 Nov", comments: 2 },
  { name: "Brief/PT Sinar Logistik.md", kind: "doc", by: "Sari (agen)", updated: "04 Nov", comments: 0 },
  { name: "Riset/Pasar logistik Jatim.md", kind: "doc", by: "Dewi A.", updated: "01 Nov", comments: 5 },
  { name: "Papan lead minggu ini", kind: "app", by: "Nadia (agen)", updated: "04 Nov", comments: 1 },
  { name: "Wiki/Kebijakan cuti.md", kind: "doc", by: "Sinta R.", updated: "28 Okt", comments: 0 },
];

export default function WorkspacePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Workspace" desc="File bersama untuk Anda dan agen: dokumen, riset, wiki, dan aplikasi kecil buatan agen." />
      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-sm text-muted">
          <FolderOpen size={16} aria-hidden="true" /> Tim Growth
        </div>
        <ul className="divide-y divide-line">
          {files.map((f) => {
            const Icon = f.kind === "app" ? LayoutGrid : FileText;
            return (
              <li key={f.name} className="flex items-center gap-3 px-4 py-3">
                <Icon size={17} className={f.kind === "app" ? "text-accent" : "text-muted"} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted">{f.by} · diubah {f.updated}</p>
                </div>
                {f.kind === "app" && <Badge tone="accent">Aplikasi</Badge>}
                {f.comments > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <MessageCircle size={13} aria-hidden="true" /> {f.comments}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
