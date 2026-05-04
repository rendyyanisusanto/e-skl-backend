'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_requirements', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      student_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      requirement_type_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'requirement_types', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      status: { type: Sequelize.ENUM('PENDING', 'COMPLETED', 'REJECTED', 'WAIVED'), allowNull: false, defaultValue: 'PENDING' },
      notes: { type: Sequelize.TEXT },
      completed_at: { type: Sequelize.DATE },
      verified_by: {
        type: Sequelize.BIGINT,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
    await queryInterface.addIndex('student_requirements', ['student_id', 'requirement_type_id'], { unique: true, name: 'student_req_unique' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('student_requirements');
  },
};
