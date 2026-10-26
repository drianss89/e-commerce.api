# E-Commerce Catalog Service REST API

REST API sederhana untuk layanan katalog produk e-commerce, dibangun dengan Node.js dan Express.js.

## Instalasi

```bash
npm install
```

## Menjalankan Server

```bash
# Mode produksi
npm start

# Mode development (auto-reload)
npm run dev
```

Server akan berjalan di `http://localhost:3000`

---

## Endpoints

### GET /api/v1/products
Mengembalikan seluruh daftar produk.

**Response:**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Daftar produk berhasil dimuat",
  "total": 8,
  "data": [ ... ]
}
```

---

### GET /api/v1/products/:id
Mengembalikan detail satu produk berdasarkan ID.

**Contoh:** `GET /api/v1/products/prod_001`

**Response (sukses):**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Detail produk berhasil dimuat",
  "data": {
    "id": "prod_001",
    "nama_product": "Kaos Polos Cotton Combed 30s",
    "harga_product": 75000,
    "foto_product": "https://...",
    "variasi_product": [
      { "warna": "Hitam", "ukuran": "L", "quantity": 20 }
    ],
    "deskripsi": "..."
  }
}
```

**Response (tidak ditemukan):**
```json
{
  "success": false,
  "status_code": 404,
  "message": "Produk dengan id 'prod_999' tidak ditemukan",
  "data": null
}
```

---

## Data Produk yang Tersedia

| ID | Nama Produk | Harga |
|---|---|---|
| prod_001 | Kaos Polos Cotton Combed 30s | Rp 75.000 |
| prod_002 | Celana Jogger Pria Fleece | Rp 120.000 |
| prod_003 | Sepatu Sneakers Casual Pria | Rp 350.000 |
| prod_004 | Tas Ransel Laptop 15 Inch | Rp 275.000 |
| prod_005 | Kemeja Flanel Lengan Panjang | Rp 165.000 |
| prod_006 | Jam Tangan Digital Sport | Rp 450.000 |
| prod_007 | Hoodie Zipper Oversize Unisex | Rp 195.000 |
| prod_008 | Celana Jeans Slim Fit Pria | Rp 225.000 |
