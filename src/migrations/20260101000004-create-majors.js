'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('majors', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('majors');
  },
};
