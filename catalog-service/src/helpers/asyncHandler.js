/**
 * Wrapper untuk async route handler agar error otomatis diteruskan ke
 * Express global error handler — tanpa perlu try/catch di setiap controller.
 *
 * @param {Function} fn - Async express handler
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
