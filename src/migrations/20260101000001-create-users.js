'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      username: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      email: { type: Sequelize.STRING(150) },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.ENUM('SUPERADMIN', 'ADMIN', 'PETUGAS'), allowNull: false, defaultValue: 'PETUGAS' },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      last_login_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
