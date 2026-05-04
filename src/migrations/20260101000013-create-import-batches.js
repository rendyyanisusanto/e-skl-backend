'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('import_batches', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      graduation_period_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'graduation_periods', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      file_name: { type: Sequelize.STRING(255) },
      file_path: { type: Sequelize.STRING(255) },
      total_rows: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      success_rows: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      failed_rows: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      status: { type: Sequelize.ENUM('PROCESSING', 'SUCCESS', 'FAILED'), allowNull: false, defaultValue: 'PROCESSING' },
      notes: { type: Sequelize.TEXT },
      imported_by: {
        type: Sequelize.BIGINT,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('import_batches');
  },
};
