const { sendError } = require("../helpers/response");

/**
 * Middleware validasi body request untuk POST (create) produk baru.
 * Semua field wajib harus ada dan bertipe data yang benar.
 */
const validateCreateProduct = (req, res, next) => {
  const { nama_product, harga_product, foto_product, variasi_product, deskripsi } = req.body;

  if (!nama_product || typeof nama_product !== "string") {
    return sendError(res, "Field 'nama_product' wajib diisi dan harus berupa string.");
  }

  if (harga_product === undefined || typeof harga_product !== "number" || harga_product < 0) {
    return sendError(res, "Field 'harga_product' wajib diisi, harus berupa number, dan tidak boleh negatif.");
  }

  if (!foto_product || typeof foto_product !== "string") {
    return sendError(res, "Field 'foto_product' wajib diisi dan harus berupa string URL.");
  }

  if (!Array.isArray(variasi_product) || variasi_product.length === 0) {
    return sendError(res, "Field 'variasi_product' wajib diisi dan harus berupa array yang tidak kosong.");
  }

  const isVariasiValid = variasi_product.every(
    (v) =>
      v.warna && typeof v.warna === "string" &&
      v.ukuran && typeof v.ukuran === "string" &&
      typeof v.quantity === "number" && v.quantity >= 0
  );
  if (!isVariasiValid) {
    return sendError(res, "Setiap item 'variasi_product' harus memiliki field 'warna' (string), 'ukuran' (string), dan 'quantity' (number >= 0).");
  }

  if (!deskripsi || typeof deskripsi !== "string") {
    return sendError(res, "Field 'deskripsi' wajib diisi dan harus berupa string.");
  }

  next();
};

/**
 * Middleware validasi body request untuk PUT (update) produk.
 * Minimal satu field harus dikirim, dan tipe datanya harus valid.
 */
const validateUpdateProduct = (req, res, next) => {
  const { nama_product, harga_product, foto_product, variasi_product, deskripsi } = req.body;
  const hasAtLeastOneField =
    nama_product !== undefined ||
    harga_product !== undefined ||
    foto_product !== undefined ||
    variasi_product !== undefined ||
    deskripsi !== undefined;

  if (!hasAtLeastOneField) {
    return sendError(res, "Minimal satu field harus disertakan untuk melakukan update.");
  }

  if (nama_product !== undefined && typeof nama_product !== "string") {
    return sendError(res, "Field 'nama_product' harus berupa string.");
  }

  if (harga_product !== undefined && (typeof harga_product !== "number" || harga_product < 0)) {
    return sendError(res, "Field 'harga_product' harus berupa number dan tidak boleh negatif.");
  }

  if (foto_product !== undefined && typeof foto_product !== "string") {
    return sendError(res, "Field 'foto_product' harus berupa string URL.");
  }

  if (variasi_product !== undefined) {
    if (!Array.isArray(variasi_product) || variasi_product.length === 0) {
      return sendError(res, "Field 'variasi_product' harus berupa array yang tidak kosong.");
    }
    const isVariasiValid = variasi_product.every(
      (v) =>
        v.warna && typeof v.warna === "string" &&
        v.ukuran && typeof v.ukuran === "string" &&
        typeof v.quantity === "number" && v.quantity >= 0
    );
    if (!isVariasiValid) {
      return sendError(res, "Setiap item 'variasi_product' harus memiliki field 'warna' (string), 'ukuran' (string), dan 'quantity' (number >= 0).");
    }
  }

  if (deskripsi !== undefined && typeof deskripsi !== "string") {
    return sendError(res, "Field 'deskripsi' harus berupa string.");
  }

  next();
};

module.exports = { validateCreateProduct, validateUpdateProduct };
