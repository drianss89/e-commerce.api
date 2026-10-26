const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../middleware/validateProduct");
const asyncHandler = require("../helpers/asyncHandler");

const router = Router();

// ─────────────────────────────────────────────────────────────
// GET    /api/v1/products        → semua produk
// POST   /api/v1/products        → tambah produk baru
// ─────────────────────────────────────────────────────────────
router.get("/",  asyncHandler(getAllProducts));
router.post("/", validateCreateProduct, asyncHandler(createProduct));

// ─────────────────────────────────────────────────────────────
// GET    /api/v1/products/:id    → detail produk
// PUT    /api/v1/products/:id    → update produk
// DELETE /api/v1/products/:id   → hapus produk
// ─────────────────────────────────────────────────────────────
router.get("/:id",    asyncHandler(getProductById));
router.put("/:id",    validateUpdateProduct, asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

module.exports = router;
