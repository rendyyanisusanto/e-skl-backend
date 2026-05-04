'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('graduation_results', {
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
      status: { type: Sequelize.ENUM('LULUS', 'TIDAK_LULUS', 'DITUNDA'), allowNull: false, defaultValue: 'DITUNDA' },
      notes: { type: Sequelize.TEXT },
      published_at: { type: Sequelize.DATE },
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
    await queryInterface.dropTable('graduation_results');
  },
};
