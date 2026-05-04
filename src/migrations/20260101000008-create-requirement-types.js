'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requirement_types', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      graduation_period_id: {
        type: Sequelize.BIGINT, allowNull: false,
        references: { model: 'graduation_periods', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT },
      is_required: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
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
    await queryInterface.dropTable('requirement_types');
  },
};
