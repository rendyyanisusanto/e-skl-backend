'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      graduation_period_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'graduation_periods', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      class_id: {
        type: Sequelize.BIGINT,
        references: { model: 'classes', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      major_id: {
        type: Sequelize.BIGINT,
        references: { model: 'majors', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      nis: { type: Sequelize.STRING(50) },
      nisn: { type: Sequelize.STRING(50), allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false },
      gender: { type: Sequelize.ENUM('L', 'P') },
      birth_place: { type: Sequelize.STRING(100) },
      birth_date: { type: Sequelize.DATEONLY },
      parent_name: { type: Sequelize.STRING(150) },
      address: { type: Sequelize.TEXT },
      phone: { type: Sequelize.STRING(50) },
      access_token: { type: Sequelize.STRING(100), unique: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
    await queryInterface.addIndex('students', ['graduation_period_id', 'nisn'], { unique: true, name: 'students_period_nisn_unique' });
    await queryInterface.addIndex('students', ['nis']);
    await queryInterface.addIndex('students', ['nisn']);
    await queryInterface.addIndex('students', ['name']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('students');
  },
};
