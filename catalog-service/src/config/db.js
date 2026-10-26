const mysql = require("mysql2/promise");

/**
 * Connection pool MySQL.
 * Menggunakan pool agar koneksi di-reuse dan tidak membuka
 * koneksi baru untuk setiap request (lebih efisien).
 */
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  port:     parseInt(process.env.DB_PORT || "3306"),
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME     || "ecommerce_catalog",
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

/**
 * Tes koneksi saat aplikasi pertama kali dijalankan.
 * Akan melempar error jika database tidak bisa dijangkau.
 */
const testConnection = async () => {
  const conn = await pool.getConnection();
  console.log("✅ Koneksi database MySQL berhasil.");
  conn.release();
};

module.exports = { pool, testConnection };
