/**
 * Script test manual untuk semua endpoint CRUD.
 * Jalankan dengan: node test.js
 * (Pastikan server sudah berjalan di port 3000)
 */

const http = require("http");

const BASE = { host: "localhost", port: 3000, basePath: "/api/v1/products" };

// ── Utility: kirim HTTP request dan return Promise ──────────────────────────
const request = (method, path, body = null) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      ...BASE,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(payload && { "Content-Length": Buffer.byteLength(payload) }),
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });

    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });

// ── Logger ──────────────────────────────────────────────────────────────────
const log = (label, { status, body }) => {
  const icon = body.success ? "✅" : "⚠️ ";
  console.log(`\n${"─".repeat(55)}`);
  console.log(`${icon} [${status}] ${label}`);
  console.log(JSON.stringify(body, null, 2));
};

// ── Run semua test secara berurutan ──────────────────────────────────────────
(async () => {
  console.log("🚀 Mulai test CRUD API...\n");

  // 1. GET semua produk
  const all = await request("GET", BASE.basePath);
  log("GET /api/v1/products", all);

  // 2. GET produk by ID yang valid
  const detail = await request("GET", `${BASE.basePath}/prod_001`);
  log("GET /api/v1/products/prod_001", detail);

  // 3. GET produk dengan ID yang tidak ada → expect 404
  const notFound = await request("GET", `${BASE.basePath}/prod_999`);
  log("GET /api/v1/products/prod_999 (expect 404)", notFound);

  // 4. POST tambah produk baru
  const created = await request("POST", BASE.basePath, {
    nama_product: "Topi Baseball Unisex",
    harga_product: 85000,
    foto_product: "https://example.com/topi.jpg",
    variasi_product: [
      { warna: "Hitam", ukuran: "One Size", quantity: 50 },
      { warna: "Putih", ukuran: "One Size", quantity: 30 },
    ],
    deskripsi: "Topi baseball casual unisex berbahan katun twill, nyaman dan stylish.",
  });
  log("POST /api/v1/products (buat produk baru)", created);
  const newId = created.body.data?.id;

  // 5. POST dengan body tidak lengkap → expect 400
  const badPost = await request("POST", BASE.basePath, {
    nama_product: "Produk Tidak Lengkap",
  });
  log("POST body tidak lengkap (expect 400)", badPost);

  // 6. PUT update produk yang baru dibuat
  const updated = await request("PUT", `${BASE.basePath}/${newId}`, {
    harga_product: 95000,
    deskripsi: "Harga diperbarui setelah promo.",
  });
  log(`PUT /api/v1/products/${newId} (update harga & deskripsi)`, updated);

  // 7. PUT tanpa field apapun → expect 400
  const badPut = await request("PUT", `${BASE.basePath}/${newId}`, {});
  log(`PUT body kosong (expect 400)`, badPut);

  // 8. DELETE produk yang baru dibuat
  const deleted = await request("DELETE", `${BASE.basePath}/${newId}`);
  log(`DELETE /api/v1/products/${newId}`, deleted);

  // 9. GET produk yang sudah dihapus → expect 404
  const afterDelete = await request("GET", `${BASE.basePath}/${newId}`);
  log(`GET /${newId} setelah dihapus (expect 404)`, afterDelete);

  console.log(`\n${"─".repeat(55)}`);
  console.log("✔️  Semua test selesai.\n");
})();
