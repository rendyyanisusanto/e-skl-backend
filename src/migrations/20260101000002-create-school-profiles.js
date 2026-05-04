'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('school_profiles', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      school_name: { type: Sequelize.STRING(200), allowNull: false },
      npsn: { type: Sequelize.STRING(50) },
      address: { type: Sequelize.TEXT },
      phone: { type: Sequelize.STRING(50) },
      email: { type: Sequelize.STRING(150) },
      website: { type: Sequelize.STRING(150) },
      logo_path: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('school_profiles');
  },
};
