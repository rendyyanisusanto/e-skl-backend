'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('import_batch_details', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      import_batch_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'import_batches', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      row_number: { type: Sequelize.INTEGER, allowNull: false },
      nis: { type: Sequelize.STRING(50) },
      nisn: { type: Sequelize.STRING(50) },
      name: { type: Sequelize.STRING(150) },
      status: { type: Sequelize.ENUM('SUCCESS', 'FAILED'), allowNull: false },
      message: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('import_batch_details');
  },
};
