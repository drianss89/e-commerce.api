const { pool } = require("../config/db");

/**
 * Model layer — semua query SQL terpusat di sini.
 * Controller tidak boleh menulis SQL secara langsung.
 */

// ── Helper: susun ulang rows flat menjadi object produk dengan array variasi ──
const formatProduct = (rows) => {
  if (!rows.length) return null;

  const { id, nama_product, harga_product, foto_product, deskripsi } = rows[0];

  return {
    id,
    nama_product,
    harga_product: parseFloat(harga_product),
    foto_product,
    variasi_product: rows
      // Varian bisa null jika produk belum punya varian (LEFT JOIN)
      .filter((r) => r.variant_id !== null)
      .map((r) => ({
        id:       r.variant_id,
        warna:    r.warna,
        ukuran:   r.ukuran,
        quantity: r.quantity,
      })),
    deskripsi,
  };
};

// ── SELECT: semua produk ────────────────────────────────────────────────────
const findAll = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id, p.nama_product, p.harga_product, p.foto_product, p.deskripsi,
      v.id AS variant_id, v.warna, v.ukuran, v.quantity
    FROM products p
    LEFT JOIN product_variants v ON v.product_id = p.id
    ORDER BY p.id, v.id
  `);

  // Kelompokkan rows berdasarkan product id
  const productMap = new Map();
  for (const row of rows) {
    if (!productMap.has(row.id)) {
      productMap.set(row.id, []);
    }
    productMap.get(row.id).push(row);
  }

  return [...productMap.values()].map(formatProduct);
};

// ── SELECT: satu produk berdasarkan ID ────────────────────────────────────
const findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      p.id, p.nama_product, p.harga_product, p.foto_product, p.deskripsi,
      v.id AS variant_id, v.warna, v.ukuran, v.quantity
    FROM products p
    LEFT JOIN product_variants v ON v.product_id = p.id
    WHERE p.id = ?
    ORDER BY v.id`,
    [id]
  );

  return formatProduct(rows);
};

// ── INSERT: produk baru + variasinya (dalam satu transaksi) ───────────────
const create = async ({ id, nama_product, harga_product, foto_product, variasi_product, deskripsi }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `INSERT INTO products (id, nama_product, harga_product, foto_product, deskripsi)
       VALUES (?, ?, ?, ?, ?)`,
      [id, nama_product, harga_product, foto_product, deskripsi]
    );

    if (variasi_product?.length) {
      const variantRows = variasi_product.map((v) => [id, v.warna, v.ukuran, v.quantity]);
      await conn.query(
        `INSERT INTO product_variants (product_id, warna, ukuran, quantity) VALUES ?`,
        [variantRows]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  return findById(id);
};

// ── UPDATE: produk + replace semua variasinya jika dikirim ────────────────
const update = async (id, { nama_product, harga_product, foto_product, variasi_product, deskripsi }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Bangun SET clause secara dinamis — hanya update field yang dikirim
    const fields = [];
    const values = [];

    if (nama_product  !== undefined) { fields.push("nama_product = ?");  values.push(nama_product); }
    if (harga_product !== undefined) { fields.push("harga_product = ?"); values.push(harga_product); }
    if (foto_product  !== undefined) { fields.push("foto_product = ?");  values.push(foto_product); }
    if (deskripsi     !== undefined) { fields.push("deskripsi = ?");     values.push(deskripsi); }

    if (fields.length) {
      await conn.query(
        `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
        [...values, id]
      );
    }

    // Jika variasi dikirim, hapus semua varian lama dan insert yang baru
    if (variasi_product !== undefined) {
      await conn.query(`DELETE FROM product_variants WHERE product_id = ?`, [id]);
      const variantRows = variasi_product.map((v) => [id, v.warna, v.ukuran, v.quantity]);
      await conn.query(
        `INSERT INTO product_variants (product_id, warna, ukuran, quantity) VALUES ?`,
        [variantRows]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  return findById(id);
};

// ── DELETE: produk (cascade ke varian otomatis via FK) ───────────────────
const remove = async (id) => {
  const [result] = await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};

// ── Cek apakah ID sudah dipakai ──────────────────────────────────────────
const isIdExists = async (id) => {
  const [rows] = await pool.query(`SELECT id FROM products WHERE id = ? LIMIT 1`, [id]);
  return rows.length > 0;
};

// ── Ambil ID tertinggi untuk auto-generate ID baru ───────────────────────
const getLastId = async () => {
  const [rows] = await pool.query(
    `SELECT id FROM products ORDER BY id DESC LIMIT 1`
  );
  return rows[0]?.id ?? null;
};

module.exports = { findAll, findById, create, update, remove, isIdExists, getLastId };
