'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('graduation_periods', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      academic_year: { type: Sequelize.STRING(20), allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false },
      announcement_date: { type: Sequelize.DATE },
      download_start_at: { type: Sequelize.DATE },
      download_end_at: { type: Sequelize.DATE },
      is_published: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_by: {
        type: Sequelize.BIGINT,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('graduation_periods');
  },
};
