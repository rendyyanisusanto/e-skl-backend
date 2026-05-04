const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({ success: false, message: 'Validasi gagal.', errors });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ success: false, message: 'Data terkait tidak ditemukan.', errors: [] });
  }

  const status = err.status || 500;
  const message = err.message || 'Terjadi kesalahan pada server.';

  return res.status(status).json({ success: false, message, errors: [] });
};

module.exports = errorHandler;
