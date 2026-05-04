'use strict';
module.exports = (sequelize, DataTypes) => {
  const GraduationResult = sequelize.define('GraduationResult', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.BIGINT, allowNull: false, unique: true, field: 'student_id' },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    status: { type: DataTypes.ENUM('LULUS', 'TIDAK_LULUS', 'DITUNDA'), allowNull: false, defaultValue: 'DITUNDA' },
    notes: { type: DataTypes.TEXT },
    publishedAt: { type: DataTypes.DATE, field: 'published_at' },
    createdBy: { type: DataTypes.BIGINT, field: 'created_by' },
  }, {
    tableName: 'graduation_results',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  GraduationResult.associate = (models) => {
    GraduationResult.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    GraduationResult.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    GraduationResult.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  };

  return GraduationResult;
};
