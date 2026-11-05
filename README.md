# TANIA-Agents

Workspace agen AI untuk tim, dalam Bahasa Indonesia. Konsepnya diadaptasi dari proyek open-source [Agenta](https://github.com/Agenta-AI/agenta) (lisensi MIT untuk kode di luar folder `ee/`). Kode di repo ini ditulis ulang dan tidak menyalin kode atau brand Agenta.

## Halaman

| Rute | Isi |
|---|---|
| `/` | Landing page: hero, prinsip, cara kerja, fitur, template, self-host |
| `/app` | Daftar agen, statistik minggu ini, buat agen lewat chat, run terbaru |
| `/app/agents/[id]` | Studio agen: chat (simulasi), konfigurasi model & instruksi, izin alat (mati/baca/tulis + persetujuan), riwayat versi |
| `/app/automations` | Automasi terjadwal/berbasis event, toggle aktif, jalankan manual |
| `/app/runs` | Jejak & biaya: daftar run, span tree per langkah, persetujuan aksi |
| `/app/integrations` | Katalog integrasi (MCP/Composio/bawaan) dengan pencarian & filter |
| `/app/workspace` | File bersama tim dan agen |

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Menghubungkan model AI

Chat di Studio agen memakai [AI SDK](https://ai-sdk.dev) dengan ModelHub (`https://api-modelhub.aiplayground.id`), proxy LiteLLM yang kompatibel dengan OpenAI. Kodenya ada di `src/lib/modelhub.ts` dan `src/app/api/chat/route.ts`.

1. Minta kunci API ModelHub ke admin ModelHub.
2. `cp .env.example .env.local`, lalu isi `MODELHUB_API_KEY`. Isi `MODELHUB_DEFAULT_MODEL` bila perlu.
3. Jalankan ulang `npm run dev`.

Di Vercel, tambahkan variabel yang sama di Project Settings → Environment Variables, lalu deploy ulang. Daftar model diambil dari `GET /v1/models` memakai kunci tersebut (route `/api/models`, disimpan 5 menit), jadi pilihan model di panel Konfigurasi selalu sesuai akses kunci. Agen bawaan memakai model `auto`, yaitu `MODELHUB_DEFAULT_MODEL` atau model pertama yang tersedia. Server menolak model di luar daftar itu. Instruksi dan model dari panel kanan ikut terkirim, jadi perubahan langsung bisa dicoba sebelum disimpan. Integrasi (Gmail, HubSpot, dan lainnya) belum tersambung sebagai tool. Agen diberi tahu hal ini agar tidak mengarang hasil.

## Status

Data agen, run, dan automasi berasal dari `src/lib/data.ts` (mock), dan perubahan di UI hanya disimpan di memori browser. Langkah berikutnya untuk produksi:

- Sambungkan integrasi sebagai tool AI SDK (MCP/Composio) sesuai izin per agen.
- Simpan agen, versi, run, dan automasi di database.
- Tambahkan autentikasi dan peran tim.

Stack: Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, lucide-react.
