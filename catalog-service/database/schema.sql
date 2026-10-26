-- ============================================================
-- E-Commerce Catalog Service — Database Schema & Seed Data
-- Jalankan file ini di phpMyAdmin atau MySQL CLI:
--   mysql -u root < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS ecommerce_catalog
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ecommerce_catalog;

-- ── Tabel products ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            VARCHAR(20)       NOT NULL PRIMARY KEY,
  nama_product  VARCHAR(255)      NOT NULL,
  harga_product DECIMAL(12, 2)    NOT NULL,
  foto_product  TEXT              NOT NULL,
  deskripsi     TEXT              NOT NULL,
  created_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Tabel product_variants ──────────────────────────────────
-- Relasi one-to-many: satu produk bisa punya banyak varian
CREATE TABLE IF NOT EXISTS product_variants (
  id         INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(20)    NOT NULL,
  warna      VARCHAR(100)   NOT NULL,
  ukuran     VARCHAR(50)    NOT NULL,
  quantity   INT            NOT NULL DEFAULT 0,
  CONSTRAINT fk_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Seed Data
-- ============================================================

-- Hapus data lama jika ada (untuk re-run)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE product_variants;
TRUNCATE TABLE products;
SET FOREIGN_KEY_CHECKS = 1;

-- ── Products ─────────────────────────────────────────────────
INSERT INTO products (id, nama_product, harga_product, foto_product, deskripsi) VALUES
('prod_001', 'Kaos Polos Cotton Combed 30s', 75000,
 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
 'Kaos polos berbahan 100% cotton combed 30s yang nyaman, adem, dan menyerap keringat dengan baik. Cocok untuk aktivitas sehari-hari maupun sebagai bahan sablon/custom.'),

('prod_002', 'Celana Jogger Pria Fleece', 120000,
 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
 'Celana jogger pria berbahan fleece tebal dan lembut, cocok untuk santai di rumah maupun olahraga ringan. Dilengkapi kantong samping dan tali kolor elastis untuk kenyamanan maksimal.'),

('prod_003', 'Sepatu Sneakers Casual Pria', 350000,
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
 'Sepatu sneakers casual pria dengan desain minimalis dan modern. Sol karet anti-slip memberikan kenyamanan dan keamanan saat dipakai. Bahan upper kanvas berkualitas tinggi yang ringan dan breathable.'),

('prod_004', 'Tas Ransel Laptop 15 Inch', 275000,
 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
 'Tas ransel laptop kapasitas besar yang dapat menampung laptop hingga ukuran 15 inch. Dilengkapi bantalan punggung ergonomis, slot USB charging eksternal, dan bahan water-resistant.'),

('prod_005', 'Kemeja Flanel Lengan Panjang', 165000,
 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
 'Kemeja flanel lengan panjang dengan motif kotak-kotak klasik. Bahan flanel tebal dan lembut yang hangat, ideal untuk musim dingin atau ruangan ber-AC. Tersedia dalam berbagai kombinasi warna menarik.'),

('prod_006', 'Jam Tangan Digital Sport', 450000,
 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
 'Jam tangan digital sport dengan fitur lengkap: stopwatch, alarm, penghitung kalori, dan water-resistant hingga 50 meter. Layar LCD backlight memudahkan pembacaan dalam kondisi gelap.'),

('prod_007', 'Hoodie Zipper Oversize Unisex', 195000,
 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500',
 'Hoodie zipper oversize unisex dengan bahan fleece premium tebal 400gsm. Potongan oversize memberikan tampilan kekinian dan nyaman. Dilengkapi dua kantong depan dan ritsleting YKK berkualitas.'),

('prod_008', 'Celana Jeans Slim Fit Pria', 225000,
 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
 'Celana jeans slim fit pria berbahan denim stretch 11oz yang memberikan kenyamanan gerak. Potongan slim yang rapi dan elegan cocok untuk berbagai kesempatan, mulai dari kasual hingga semi-formal.');

-- ── Product Variants ─────────────────────────────────────────
INSERT INTO product_variants (product_id, warna, ukuran, quantity) VALUES
-- prod_001: Kaos Polos
('prod_001', 'Hitam',  'S',  30), ('prod_001', 'Hitam', 'M',  25),
('prod_001', 'Hitam',  'L',  20), ('prod_001', 'Hitam', 'XL', 15),
('prod_001', 'Putih',  'S',  28), ('prod_001', 'Putih', 'M',  10),
('prod_001', 'Putih',  'L',  18), ('prod_001', 'Putih', 'XL', 12),
('prod_001', 'Navy',   'M',  20), ('prod_001', 'Navy',  'L',  17),

-- prod_002: Celana Jogger
('prod_002', 'Abu-abu', 'M', 22), ('prod_002', 'Abu-abu', 'L',  18),
('prod_002', 'Abu-abu', 'XL', 10),('prod_002', 'Hitam',  'M',  25),
('prod_002', 'Hitam',   'L',  20),('prod_002', 'Hitam',  'XL', 14),

-- prod_003: Sepatu Sneakers
('prod_003', 'Putih', '39', 8),  ('prod_003', 'Putih', '40', 12),
('prod_003', 'Putih', '41', 15), ('prod_003', 'Putih', '42', 10),
('prod_003', 'Hitam', '39', 7),  ('prod_003', 'Hitam', '40', 9),
('prod_003', 'Hitam', '41', 11), ('prod_003', 'Hitam', '42', 6),

-- prod_004: Tas Ransel
('prod_004', 'Hitam',   'One Size', 35),
('prod_004', 'Abu-abu', 'One Size', 20),
('prod_004', 'Navy',    'One Size', 15),

-- prod_005: Kemeja Flanel
('prod_005', 'Merah-Hitam',  'M',  18), ('prod_005', 'Merah-Hitam',  'L',  14),
('prod_005', 'Merah-Hitam',  'XL', 10), ('prod_005', 'Biru-Putih',   'M',  16),
('prod_005', 'Biru-Putih',   'L',  12), ('prod_005', 'Biru-Putih',   'XL',  8),
('prod_005', 'Hijau-Hitam',  'M',  15), ('prod_005', 'Hijau-Hitam',  'L',  11),

-- prod_006: Jam Tangan
('prod_006', 'Hitam', 'One Size', 40), ('prod_006', 'Merah', 'One Size', 25),
('prod_006', 'Biru',  'One Size', 20), ('prod_006', 'Putih', 'One Size', 15),

-- prod_007: Hoodie Zipper
('prod_007', 'Hitam',      'M',  30), ('prod_007', 'Hitam',      'L',  25),
('prod_007', 'Hitam',      'XL', 20), ('prod_007', 'Cream',      'M',  22),
('prod_007', 'Cream',      'L',  18), ('prod_007', 'Cream',      'XL', 14),
('prod_007', 'Sage Green', 'M',  19), ('prod_007', 'Sage Green', 'L',  16),

-- prod_008: Celana Jeans
('prod_008', 'Biru Dongker', '28', 12), ('prod_008', 'Biru Dongker', '29', 15),
('prod_008', 'Biru Dongker', '30', 18), ('prod_008', 'Biru Dongker', '31', 14),
('prod_008', 'Biru Dongker', '32', 10), ('prod_008', 'Hitam',        '28', 10),
('prod_008', 'Hitam',        '29', 13), ('prod_008', 'Hitam',        '30', 16),
('prod_008', 'Hitam',        '31', 11);
