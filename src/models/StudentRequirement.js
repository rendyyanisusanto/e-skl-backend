'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentRequirement = sequelize.define('StudentRequirement', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.BIGINT, allowNull: false, field: 'student_id' },
    requirementTypeId: { type: DataTypes.BIGINT, allowNull: false, field: 'requirement_type_id' },
    status: { type: DataTypes.ENUM('PENDING', 'COMPLETED', 'REJECTED', 'WAIVED'), allowNull: false, defaultValue: 'PENDING' },
    notes: { type: DataTypes.TEXT },
    completedAt: { type: DataTypes.DATE, field: 'completed_at' },
    verifiedBy: { type: DataTypes.BIGINT, field: 'verified_by' },
  }, {
    tableName: 'student_requirements',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  StudentRequirement.associate = (models) => {
    StudentRequirement.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    StudentRequirement.belongsTo(models.RequirementType, { foreignKey: 'requirement_type_id', as: 'requirementType' });
    StudentRequirement.belongsTo(models.User, { foreignKey: 'verified_by', as: 'verifier' });
  };

  return StudentRequirement;
};
