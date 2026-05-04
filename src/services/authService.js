const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/token');

const login = async (username, password) => {
  const user = await User.findOne({ where: { username, isActive: true } });
  if (!user) throw { status: 401, message: 'Username atau password salah.' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Username atau password salah.' };

  await user.update({ lastLoginAt: new Date() });

  const token = generateToken({ id: user.id, username: user.username, role: user.role, name: user.name });

  return {
    token,
    user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role },
  };
};

const getMe = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'name', 'username', 'email', 'role', 'isActive', 'lastLoginAt'],
  });
  if (!user) throw { status: 404, message: 'User tidak ditemukan.' };
  return user;
};

module.exports = { login, getMe };
