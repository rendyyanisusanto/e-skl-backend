'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_logs', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      skl_document_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'skl_documents', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      verification_code: { type: Sequelize.STRING(100), allowNull: false },
      checked_at: { type: Sequelize.DATE, allowNull: false },
      ip_address: { type: Sequelize.STRING(100) },
      user_agent: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('verification_logs');
  },
};
