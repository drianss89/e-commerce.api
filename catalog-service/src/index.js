require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { testConnection } = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware Global ─────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/products", productRoutes);

// ─── Root ──────────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "E-Commerce Catalog Service API is running",
    version: "1.0.0",
    endpoints: {
      getAllProducts:  "GET    /api/v1/products",
      getProductById: "GET    /api/v1/products/:id",
      createProduct:  "POST   /api/v1/products",
      updateProduct:  "PUT    /api/v1/products/:id",
      deleteProduct:  "DELETE /api/v1/products/:id",
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    status_code: 404,
    message: "Endpoint tidak ditemukan",
    data: null,
  });
});

// ─── Global Error Handler (tangkap error dari async controller) ───────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    status_code: 500,
    message: "Terjadi kesalahan pada server",
    data: null,
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const start = async () => {
  await testConnection(); // Pastikan DB siap sebelum server menerima request
  app.listen(PORT, () => {
    console.log(`\nServer berjalan di http://localhost:${PORT}`);
    console.log("─────────────────────────────────────────");
    console.log(`  GET    http://localhost:${PORT}/api/v1/products`);
    console.log(`  GET    http://localhost:${PORT}/api/v1/products/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/v1/products`);
    console.log(`  PUT    http://localhost:${PORT}/api/v1/products/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/v1/products/:id`);
    console.log("─────────────────────────────────────────\n");
  });
};

start().catch((err) => {
  console.error("❌ Gagal menjalankan server:", err.message);
  process.exit(1);
});
