'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classes', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      graduation_period_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'graduation_periods', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      major_id: {
        type: Sequelize.BIGINT,
        references: { model: 'majors', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
      name: { type: Sequelize.STRING(100), allowNull: false },
      homeroom_teacher: { type: Sequelize.STRING(150) },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('classes');
  },
};
