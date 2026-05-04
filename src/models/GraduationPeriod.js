'use strict';
module.exports = (sequelize, DataTypes) => {
  const GraduationPeriod = sequelize.define('GraduationPeriod', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    academicYear: { type: DataTypes.STRING(20), allowNull: false, field: 'academic_year' },
    name: { type: DataTypes.STRING(150), allowNull: false },
    announcementDate: { type: DataTypes.DATE, field: 'announcement_date' },
    downloadStartAt: { type: DataTypes.DATE, field: 'download_start_at' },
    downloadEndAt: { type: DataTypes.DATE, field: 'download_end_at' },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_published' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    createdBy: { type: DataTypes.BIGINT, field: 'created_by' },
  }, {
    tableName: 'graduation_periods',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  GraduationPeriod.associate = (models) => {
    GraduationPeriod.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    GraduationPeriod.hasMany(models.Class, { foreignKey: 'graduation_period_id', as: 'classes' });
    GraduationPeriod.hasMany(models.Student, { foreignKey: 'graduation_period_id', as: 'students' });
    GraduationPeriod.hasMany(models.RequirementType, { foreignKey: 'graduation_period_id', as: 'requirementTypes' });
    GraduationPeriod.hasMany(models.GraduationResult, { foreignKey: 'graduation_period_id', as: 'results' });
    GraduationPeriod.hasMany(models.SklDocument, { foreignKey: 'graduation_period_id', as: 'sklDocuments' });
    GraduationPeriod.hasMany(models.ImportBatch, { foreignKey: 'graduation_period_id', as: 'importBatches' });
  };

  return GraduationPeriod;
};
