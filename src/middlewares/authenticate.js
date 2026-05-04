const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/response');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(errorResponse('Token tidak ditemukan. Silakan login.'));
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json(errorResponse('Sesi telah berakhir. Silakan login kembali.'));
    }
    return res.status(401).json(errorResponse('Token tidak valid.'));
  }
};

module.exports = authenticate;
