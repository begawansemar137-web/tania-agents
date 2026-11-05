# TANIA-Agents

TANIA-Agents adalah workspace agen AI berbahasa Indonesia untuk tim. Tim bisa membuat agen spesialis (sales, HR, support, operasional), mengatur model, instruksi, dan izin alatnya, lalu memantau jejak serta biaya setiap run.

- Produksi: https://tania-agents.vercel.app
- Repo: https://github.com/begawansemar137-web/tania-agents

## Halaman

| Rute | Isi |
|---|---|
| `/` | Landing page: hero, prinsip, cara kerja, fitur, template |
| `/app` | Daftar agen, statistik minggu ini, form buat agen, run terbaru, template |
| `/app/agents/[id]` | Studio agen: chat dengan model AI, pilihan model dan instruksi, izin alat (mati/baca/tulis + persetujuan), riwayat versi |
| `/app/automations` | Automasi terjadwal atau berbasis event, toggle aktif, jalankan manual |
| `/app/runs` | Jejak dan biaya: daftar run, span tree per langkah, persetujuan aksi |
| `/app/integrations` | Katalog integrasi (MCP, Composio, bawaan) dengan pencarian dan filter |
| `/app/workspace` | File bersama tim dan agen |

API:

| Rute | Fungsi |
|---|---|
| `POST /api/chat` | Mengalirkan (streaming) jawaban agen dari ModelHub |
| `GET /api/models` | Daftar model yang bisa dipakai kunci ModelHub |

## Menjalankan secara lokal

Butuh Node.js 22 atau lebih baru.

```bash
npm install
cp .env.example .env.local   # lalu isi MODELHUB_API_KEY
npm run dev
```

Buka http://localhost:3000. Tanpa kunci, semua halaman tetap bisa dibuka, tetapi chat menampilkan pesan "Model belum terhubung".

## Model AI (ModelHub)

Chat memakai [AI SDK](https://ai-sdk.dev) dengan ModelHub (`https://api-modelhub.aiplayground.id/v1`). ModelHub adalah proxy LiteLLM yang kompatibel dengan OpenAI. Kodenya ada di `src/lib/modelhub.ts` dan `src/app/api/chat/route.ts`.

| Variabel | Wajib | Keterangan |
|---|---|---|
| `MODELHUB_API_KEY` | Ya | Kunci API ModelHub. Minta ke admin ModelHub. |
| `MODELHUB_DEFAULT_MODEL` | Tidak | Model untuk agen yang memakai `auto`. Kalau kosong, dipakai model pertama yang tersedia. |
| `MODELHUB_BASE_URL` | Tidak | Default `https://api-modelhub.aiplayground.id/v1` |

Cara kerjanya:

- Daftar model diambil dari `GET /v1/models` memakai kunci di atas, lalu disimpan 5 menit. Pilihan model di panel Konfigurasi selalu sesuai akses kunci, dan server menolak model di luar daftar itu.
- Model dan instruksi dari panel Konfigurasi ikut terkirim di setiap pesan, jadi perubahan bisa dicoba sebelum disimpan.
- Error dari ModelHub (kunci tidak valid, kuota habis) ditampilkan dalam Bahasa Indonesia, sedangkan detail teknisnya hanya ditulis ke log server.

## Deploy

Proyek terhubung ke Vercel (tim `scale-gpt`, proyek `tania-agents`). Setiap push ke `main` otomatis di-deploy ke produksi.

Isi variabel lingkungan di Vercel → Project Settings → Environment Variables, atau lewat CLI:

```bash
vercel env add MODELHUB_API_KEY production
```

Setelah variabel diubah, lakukan Redeploy agar nilainya terpakai.

## Status

Yang sudah berjalan sungguhan adalah chat agen ke ModelHub. Bagian lain masih berupa prototipe:

- Data agen, run, automasi, dan integrasi berasal dari `src/lib/data.ts` (data contoh).
- Perubahan di UI (izin, versi, toggle automasi, koneksi integrasi, form buat agen) hanya tersimpan sementara di browser.
- Integrasi belum tersambung sebagai tool. Agen diberi tahu hal ini agar tidak mengarang hasil dari email, kalender, atau CRM.

Langkah berikutnya:

1. Sambungkan integrasi sebagai tool AI SDK (MCP/Composio) sesuai izin per agen.
2. Simpan agen, versi, run, dan automasi di database.
3. Tambahkan autentikasi dan peran tim.

## Stack

Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, AI SDK 7 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`), lucide-react.

## Struktur

```
src/
  app/
    page.tsx              landing page
    app/                  aplikasi (sidebar + halaman)
    api/chat/route.ts     streaming chat ke ModelHub
    api/models/route.ts   daftar model ModelHub
  components/             UI: studio agen, sidebar, daftar run, dll.
  lib/
    data.ts               data contoh
    modelhub.ts           provider ModelHub + daftar model
```
