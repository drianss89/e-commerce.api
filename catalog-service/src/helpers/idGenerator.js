const { getLastId } = require("../models/productModel");

/**
 * Generate ID produk baru berdasarkan ID tertinggi di database.
 * Format: prod_XXX (3 digit, zero-padded)
 * @returns {Promise<string>}
 */
const generateProductId = async () => {
  const lastId = await getLastId();
  if (!lastId) return "prod_001";

  const lastNumber = parseInt(lastId.replace("prod_", ""), 10);
  const nextNumber = String(lastNumber + 1).padStart(3, "0");
  return `prod_${nextNumber}`;
};

module.exports = { generateProductId };
