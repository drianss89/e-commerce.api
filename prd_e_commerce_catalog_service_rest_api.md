# Product Requirements Document (PRD): E-Commerce Catalog Service REST API

## 1. Informasi Umum

| Parameter | Spesifikasi |
| :--- | :--- |
| **Nama Proyek** | E-Commerce Catalog Service REST API |
| **Bahasa Pemrograman** | JavaScript (Node.js) |
| **Framework** | Express.js |
| **Status** | Draft / Perencanaan |

---

## 2. Latar Belakang & Tujuan

### Latar Belakang
Latar belakang proyek ini adalah menyediakan layanan backend sederhana (*Catalog Service*) yang bertugas menyajikan data produk secara cepat dan akurat kepada aplikasi frontend (web atau mobile).

### Tujuan Utama
* Membangun REST API endpoint untuk menampilkan daftar produk dan detail produk.
* Memastikan struktur response JSON menyediakan informasi minimal yang dibutuhkan oleh pengguna (Nama, Harga, Foto, Variasi, dan Deskripsi).

---

## 3. Tech Stack yang Disarankan

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database (Opsional/Mock):** MongoDB / PostgreSQL / File JSON dummy

---

## 4. Desain Endpoint API

### A. Mendapatkan Daftar Semua Produk
* **Endpoint:** `GET /api/v1/products`
* **Deskripsi:** Mengembalikan daftar seluruh produk yang tersedia di katalog.

### B. Mendapatkan Detail Produk Berdasarkan ID
* **Endpoint:** `GET /api/v1/products/:id`
* **Deskripsi:** Mengembalikan detail spesifik dari satu produk berdasarkan ID-nya.

---

## 5. Spesifikasi Response API (JSON Schema)

Response API harus memenuhi minimal field yang telah ditentukan. Berikut adalah contoh struktur JSON yang dikembalikan oleh endpoint `GET /api/v1/products/:id`:

```json
{
  "success": true,
  "status_code": 200,
  "message": "Detail produk berhasil dimuat",
  "data": {
    "id": "prod_12345",
    "nama_product": "Kaos Polos Cotton Combed 30s",
    "harga_product": 75000,
    "foto_product": "https://example.com/images/kaos-polos.jpg",
    "variasi_product": [
      {
        "warna": "Hitam",
        "ukuran": "L",
        "quantity": 25
      },
      {
        "warna": "Putih",
        "ukuran": "M",
        "quantity": 10
      }
    ],
    "deskripsi": "Kaos polos berbahan 100% cotton combed 30s yang nyaman, adem, dan menyerap keringat dengan baik."
  }
}
```

---

## 6. Penjelasan Field Response API

| Field | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `nama_product` | String | Nama lengkap produk yang dijual. |
| `harga_product` | Number | Harga produk dalam bentuk angka (Rupiah/USD). |
| `foto_product` | String (URL) | Tautan gambar/foto utama produk. |
| `variasi_product` | Array of Objects | Daftar variasi produk yang mencakup:<br>- **Warna/Ukuran**: Atribut varian (String)<br>- **Quantity**: Jumlah/stok ketersediaan (Number) |
| `deskripsi` | String | Penjelasan lengkap mengenai spesifikasi atau detail produk. |

---

## 7. Kriteria Keberhasilan (Acceptance Criteria)

- [ ] API berhasil dijalankan secara lokal menggunakan Node.js dan Express.js.
- [ ] Endpoint `GET /api/v1/products` mengembalikan daftar produk dengan format JSON yang sesuai.
- [ ] Endpoint `GET /api/v1/products/:id` mengembalikan detail produk lengkap dengan 5 field utama.
- [ ] Struktur data variasi (Warna/Ukuran dan Quantity) dapat diakses dengan benar oleh klien (frontend).