// Uji otomatis untuk Modul 6: REST produk, tRPC, dan REST tugas.
// Jalankan SETELAH `npm run dev` aktif:   node scripts/test-api.mjs
// Alamat lain:                            BASE_URL=http://localhost:3001 node scripts/test-api.mjs
//
// CATATAN: skenario POST produk valid akan MENAMBAH baris di database.
// Hapus produk "(uji)" lewat halaman /produk bila tidak diperlukan.

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
let passed = 0;
let failed = 0;

async function call(method, path, body, rawBody) {
  const response = await fetch(BASE + path, {
    method,
    headers: body !== undefined || rawBody !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: rawBody ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}
  return { status: response.status, json };
}

function check(name, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

const validProduct = {
  name: "Mouse Wireless (uji)",
  description: "Mouse nirkabel 2.4GHz untuk keperluan uji API.",
  price: 50000,
  category: "Elektronik",
};

async function main() {
  console.log(`Menguji ${BASE}\n`);

  console.log("REST /api/products");
  let r = await call("GET", "/api/products");
  check("1. GET -> 200 + array", r.status === 200 && Array.isArray(r.json), `(status ${r.status})`);

  r = await call("POST", "/api/products", validProduct);
  check("2. POST valid -> 201 + id", r.status === 201 && typeof r.json?.id === "string", `(status ${r.status})`);
  const newId = r.json?.id;

  r = await call("GET", "/api/products");
  check("3. GET -> produk baru muncul", Array.isArray(r.json) && r.json.some((p) => p.id === newId));

  r = await call("POST", "/api/products", {});
  check("4. POST {} -> 400 + error name & price", r.status === 400 && r.json?.error?.name && r.json?.error?.price, `(status ${r.status})`);

  r = await call("POST", "/api/products", { ...validProduct, price: -100 });
  check("5. POST harga negatif -> 400 + error.price", r.status === 400 && r.json?.error?.price, `(status ${r.status})`);

  r = await call("POST", "/api/products", undefined, "{bukan json");
  check("6. POST JSON rusak -> 400", r.status === 400, `(status ${r.status})`);

  r = await call("POST", "/api/products", { ...validProduct, price: "50000" });
  check("7. POST harga bertipe string -> 400", r.status === 400, `(status ${r.status})`);

  console.log("\ntRPC /api/trpc");
  r = await call("GET", "/api/trpc/getAll");
  check("8. getAll -> 200 + result.data array", r.status === 200 && Array.isArray(r.json?.result?.data), `(status ${r.status})`);

  r = await call("GET", "/api/trpc/getById?input=" + encodeURIComponent(JSON.stringify({ id: "tidak-ada" })));
  check("9. getById tak dikenal -> 200 + null", r.status === 200 && r.json?.result?.data === null, `(status ${r.status})`);

  r = await call("POST", "/api/trpc/addProduct", { ...validProduct, name: "Webcam HD (uji)" });
  check("10. addProduct valid -> 200 + id", r.status === 200 && typeof r.json?.result?.data?.id === "string", `(status ${r.status})`);

  r = await call("POST", "/api/trpc/addProduct", {});
  check("11. addProduct {} -> 400 (ditolak Zod)", r.status === 400, `(status ${r.status})`);

  console.log("\nREST /api/tugas (Tugas Mandiri)");
  r = await call("GET", "/api/tugas");
  check("12. GET -> 200 + array", r.status === 200 && Array.isArray(r.json), `(status ${r.status})`);

  r = await call("POST", "/api/tugas", { judul: "Tugas uji API", deadline: "2026-12-01" });
  check("13. POST valid -> 201, status default 'belum'", r.status === 201 && r.json?.status === "belum", `(status ${r.status})`);
  const taskId = r.json?.id;

  r = await call("POST", "/api/tugas", { judul: "Tugas uji", deadline: "31-12-2026" });
  check("14. POST deadline format salah -> 400", r.status === 400 && r.json?.error?.deadline, `(status ${r.status})`);

  r = await call("POST", "/api/tugas", { judul: "ab", deadline: "2026-12-01" });
  check("15. POST judul terlalu pendek -> 400", r.status === 400 && r.json?.error?.judul, `(status ${r.status})`);

  r = await call("POST", "/api/tugas", { judul: "Tugas uji", deadline: "2026-02-31" });
  check("16. POST tanggal tidak nyata -> 400", r.status === 400, `(status ${r.status})`);

  r = await call("PATCH", `/api/tugas/${taskId}`, { status: "selesai" });
  check("17. PATCH status -> 200 + 'selesai', judul tetap", r.status === 200 && r.json?.status === "selesai" && r.json?.judul === "Tugas uji API", `(status ${r.status})`);

  r = await call("PATCH", `/api/tugas/${taskId}`, {});
  check("18. PATCH {} -> 400", r.status === 400, `(status ${r.status})`);

  r = await call("DELETE", `/api/tugas/${taskId}`);
  check("19. DELETE -> 204", r.status === 204, `(status ${r.status})`);

  r = await call("GET", `/api/tugas/${taskId}`);
  check("20. GET setelah dihapus -> 404", r.status === 404, `(status ${r.status})`);

  console.log(`\nHasil: ${passed} lulus, ${failed} gagal`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("\nTidak dapat terhubung ke server. Apakah `npm run dev` sudah berjalan?");
  console.error(error.cause?.code ?? error.message);
  process.exit(2);
});
