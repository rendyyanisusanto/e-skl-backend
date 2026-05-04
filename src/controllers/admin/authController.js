const authService = require('../../services/authService');
const { successResponse, errorResponse } = require('../../utils/response');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json(errorResponse('Username dan password wajib diisi.'));
    const data = await authService.login(username, password);
    res.json(successResponse('Login berhasil.', data));
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(successResponse('Data user.', user));
  } catch (err) { next(err); }
};

exports.logout = (req, res) => {
  res.json(successResponse('Logout berhasil.'));
};
