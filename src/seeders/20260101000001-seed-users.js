'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('password', 10);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin',
        username: 'superadmin',
        email: 'superadmin@eskl.id',
        password: hash,
        role: 'SUPERADMIN',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { username: 'superadmin' });
  },
};
