'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequirementType = sequelize.define('RequirementType', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    isRequired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_required' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    createdBy: { type: DataTypes.BIGINT, field: 'created_by' },
  }, {
    tableName: 'requirement_types',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  RequirementType.associate = (models) => {
    RequirementType.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    RequirementType.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    RequirementType.hasMany(models.StudentRequirement, { foreignKey: 'requirement_type_id', as: 'studentRequirements' });
  };

  return RequirementType;
};
