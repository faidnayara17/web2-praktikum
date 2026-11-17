# Modul 6 — Perancangan & Konsumsi API: REST, GraphQL, dan tRPC

## 1. Cara menjalankan

```bash
npm install                       # memasang paket tRPC & TanStack Query yang baru
cp .env.example .env              # isi DATABASE_URL (MySQL)
npx prisma migrate deploy         # buat tabel
npx prisma db seed                # isi data awal
npm run dev
```

Halaman & endpoint baru:

| Alamat | Isi |
| --- | --- |
| `GET/POST /api/products` | REST produk (Langkah 3) |
| `GET /api/trpc/getAll` dkk. | tRPC (Langkah 6) |
| `/trpc-demo` | Daftar produk via tRPC + React Query (Langkah 7) |
| `GET/POST /api/tugas`, `GET/PATCH/DELETE /api/tugas/:id` | REST tugas kuliah (Tugas Mandiri) |
| `/tugas` | UI tugas kuliah (Tugas Mandiri) |

Uji otomatis (server `npm run dev` harus sudah jalan): `node scripts/test-api.mjs`

## 2. Pemetaan langkah modul ke file

| Langkah modul | File | Catatan |
| --- | --- | --- |
| 1. Penyimpanan produk | `lib/product-store.ts` | **Sudah ada** (Prisma/MySQL), jadi `lib/products.ts` in-memory tidak dibuat |
| 2. Skema Zod | `lib/product-schema.ts` | **Sudah ada**; hanya ditambah alias `ProductInput` |
| 3. REST GET & POST | `app/api/products/route.ts` | memakai `createProduct()` |
| 4. Uji Thunder Client/Postman | bagian 3 di bawah | skenario disesuaikan dengan skema proyek |
| 5. Skema GraphQL | `schema.graphql` | konseptual, tidak dijalankan |
| 6. tRPC server | `server/trpc.ts`, `server/routers/product.ts`, `app/api/trpc/[trpc]/route.ts` | |
| 7. tRPC client | `lib/trpc.ts`, `components/TrpcProvider.tsx`, `components/TrpcProductList.tsx`, `app/trpc-demo/page.tsx`, `app/layout.tsx` | |
| Tugas Mandiri | `lib/task-schema.ts`, `lib/tasks.ts`, `lib/api-utils.ts`, `app/api/tugas/**`, `components/tugas/TaskManager.tsx`, `app/tugas/page.tsx` | REST + Zod |

### Perbedaan penting dari teks modul

Skema produk di proyek ini lebih lengkap daripada di modul: **`name`, `description`, `price`, `category`** wajib diisi
(`name` min. 3 karakter, `price` harus > 0). Karena itu contoh body modul `{"name":"Mouse","price":50000}` akan
ditolak **400** di proyek ini. Gunakan body lengkap seperti di bawah.

## 3. Skenario pengujian REST (Thunder Client / Postman)

Untuk POST, atur header `Content-Type: application/json`.

| # | Request | Hasil yang diharapkan |
| --- | --- | --- |
| 1 | `GET http://localhost:3000/api/products` | `200 OK`, array produk |
| 2 | `POST /api/products` body `{"name":"Mouse Wireless","description":"Mouse nirkabel 2.4GHz untuk kantor","price":50000,"category":"Elektronik"}` | `201 Created`, objek produk baru dengan `id` |
| 3 | `GET /api/products` | `200 OK`, "Mouse Wireless" ada di daftar |
| 4 | `POST /api/products` body `{}` | `400`, `{"error":{"name":[...],"description":[...],"price":[...],"category":[...]}}` |
| 5 | `POST /api/products` body `{"name":"Kabel","description":"Kabel USB panjang 2 meter","price":-100,"category":"Elektronik"}` | `400`, `{"error":{"price":["Harga harus lebih besar dari nol."]}}` |
| 6 | `POST /api/products` body `{bukan json` | `400`, `{"error":"Body harus berupa JSON yang valid"}` |

Pesan error untuk field yang kosong bergantung pada versi Zod yang terpasang.

### tRPC (Thunder Client)

| Request | Hasil |
| --- | --- |
| `GET /api/trpc/getAll` | `200`, `{"result":{"data":[...]}}` |
| `GET /api/trpc/getById?input={"id":"tidak-ada"}` | `200`, `{"result":{"data":null}}` |
| `POST /api/trpc/addProduct` body sama seperti skenario 2 | `200`, data produk baru di `result.data` |
| `POST /api/trpc/addProduct` body `{}` | `400`, ditolak validasi Zod |

## 4. GraphQL: perbedaan dengan REST

Dengan REST, `GET /api/products` **selalu** mengembalikan seluruh objek (`id`, `name`, `description`, `price`, `category`).
Dengan GraphQL, client memilih field-nya sendiri:

```graphql
query {
  products {
    name
  }
}
```

hanya mengembalikan `name` setiap produk. Skema lengkap ada di `schema.graphql`.

## 5. Tugas Mandiri: tugas kuliah (REST + Zod)

Resource `Task`: `judul`, `deadline` (format `YYYY-MM-DD`), `status` (`belum` | `proses` | `selesai`, default `belum`).

| Operasi | Endpoint | Sukses | Gagal |
| --- | --- | --- | --- |
| Read (daftar) | `GET /api/tugas` | 200 | |
| Read (satu) | `GET /api/tugas/:id` | 200 | 404 |
| Create | `POST /api/tugas` | 201 | 400 |
| Update | `PATCH /api/tugas/:id` | 200 | 400 / 404 |
| Delete | `DELETE /api/tugas/:id` | 204 | 404 |

Contoh body POST: `{"judul":"Laporan Modul 6","deadline":"2026-12-01"}`.

Validasi Zod (`lib/task-schema.ts`): judul 3–150 karakter, deadline harus tanggal nyata (menolak `2026-02-31`),
status harus salah satu dari tiga nilai. Skema PATCH sengaja tanpa nilai default agar tidak me-reset status.

Penyimpanan memakai memori server (`globalThis`), sama seperti pola di modul, sehingga **data hilang saat server
di-restart**. Fungsi di `lib/tasks.ts` sudah `async`, jadi mudah diganti Prisma (tambahkan `model Task`).

### Perbandingan REST, GraphQL, dan tRPC

> Draf berdasarkan praktik di modul ini. Sesuaikan dengan pengalamanmu sendiri sebelum dikumpulkan.

| | REST | GraphQL | tRPC |
| --- | --- | --- | --- |
| **Cara kerja** | Resource + metode HTTP (`GET /api/products`) | Satu endpoint, client menulis query | Client memanggil procedure server seperti fungsi |
| **Kelebihan** | Sederhana, standar luas, mudah diuji di browser/Postman, status code jelas, mudah di-cache | Client memilih field sendiri (tanpa over-fetching), satu request bisa mengambil data berelasi, skema bertipe | Type safety end-to-end tanpa menulis tipe ulang, autocomplete di editor, skema Zod dipakai sekali, sedikit boilerplate |
| **Kekurangan** | Bentuk respons ditentukan server (over/under-fetching), banyak endpoint, tipe tidak otomatis sampai client | Perlu server & skema tambahan, kurva belajar lebih curam, caching HTTP lebih rumit | Hanya cocok jika frontend & backend sama-sama TypeScript, bukan standar umum untuk pihak ketiga, kurang cocok untuk API publik |
| **Cocok untuk** | API publik, integrasi lintas bahasa | Aplikasi dengan data kompleks/berelasi atau banyak jenis client (web, mobile) | Aplikasi full-stack TypeScript (monorepo, Next.js) |
| **Pengalaman di praktikum** | Perlu menulis validasi & status code sendiri; mudah diuji | Hanya konseptual (tidak ada server) | Input divalidasi Zod otomatis; `p.` langsung memunculkan `id`, `name`, `price`, dst. |

## 6. Catatan

- Type safety (tRPC) **tidak** menggantikan validasi saat runtime, itu sebabnya input tetap divalidasi Zod.
- Produk yang dibuat lewat uji POST tersimpan di database MySQL. Hapus lewat halaman `/produk` (tombol hapus).
