/**
 * Helper untuk membuat format response JSON yang konsisten di seluruh API.
 */

/**
 * Kirim response sukses.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {*} data
 * @param {number} [statusCode=200]
 */
const sendSuccess = (res, message, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    status_code: statusCode,
    message,
    data,
  });
};

/**
 * Kirim response sukses untuk koleksi (list) dengan info total.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {Array} data
 */
const sendCollection = (res, message, data) => {
  return res.status(200).json({
    success: true,
    status_code: 200,
    message,
    total: data.length,
    data,
  });
};

/**
 * Kirim response error.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=400]
 */
const sendError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    status_code: statusCode,
    message,
    data: null,
  });
};

module.exports = { sendSuccess, sendCollection, sendError };
