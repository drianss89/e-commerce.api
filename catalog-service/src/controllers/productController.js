const productModel = require("../models/productModel");
const { sendSuccess, sendCollection, sendError } = require("../helpers/response");
const { generateProductId } = require("../helpers/idGenerator");

// ─────────────────────────────────────────────
// GET /api/v1/products
// ─────────────────────────────────────────────
const getAllProducts = async (_req, res) => {
  const products = await productModel.findAll();
  return sendCollection(res, "Daftar produk berhasil dimuat", products);
};

// ─────────────────────────────────────────────
// GET /api/v1/products/:id
// ─────────────────────────────────────────────
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);

  if (!product) {
    return sendError(res, `Produk dengan id '${id}' tidak ditemukan`, 404);
  }

  return sendSuccess(res, "Detail produk berhasil dimuat", product);
};

// ─────────────────────────────────────────────
// POST /api/v1/products
// ─────────────────────────────────────────────
const createProduct = async (req, res) => {
  const id = await generateProductId();
  const newProduct = await productModel.create({ id, ...req.body });
  return sendSuccess(res, "Produk baru berhasil ditambahkan", newProduct, 201);
};

// ─────────────────────────────────────────────
// PUT /api/v1/products/:id
// ─────────────────────────────────────────────
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const exists = await productModel.isIdExists(id);

  if (!exists) {
    return sendError(res, `Produk dengan id '${id}' tidak ditemukan`, 404);
  }

  const updatedProduct = await productModel.update(id, req.body);
  return sendSuccess(res, "Produk berhasil diperbarui", updatedProduct);
};

// ─────────────────────────────────────────────
// DELETE /api/v1/products/:id
// ─────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Ambil data dulu sebelum dihapus untuk pesan response
  const product = await productModel.findById(id);
  if (!product) {
    return sendError(res, `Produk dengan id '${id}' tidak ditemukan`, 404);
  }

  await productModel.remove(id);
  return sendSuccess(res, `Produk '${product.nama_product}' berhasil dihapus`, { id });
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
