'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skl_documents', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      student_id: {
        type: Sequelize.BIGINT, allowNull: false, unique: true,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      graduation_period_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'graduation_periods', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      document_number: { type: Sequelize.STRING(150) },
      verification_code: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      original_file_name: { type: Sequelize.STRING(255), allowNull: false },
      file_path: { type: Sequelize.STRING(255), allowNull: false },
      file_size: { type: Sequelize.BIGINT },
      mime_type: { type: Sequelize.STRING(100), allowNull: false, defaultValue: 'application/pdf' },
      status: { type: Sequelize.ENUM('ACTIVE', 'LOCKED', 'VOID'), allowNull: false, defaultValue: 'ACTIVE' },
      notes: { type: Sequelize.TEXT },
      uploaded_by: {
        type: Sequelize.BIGINT,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      uploaded_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('skl_documents');
  },
};
