'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(150) },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('SUPERADMIN', 'ADMIN', 'PETUGAS'), allowNull: false, defaultValue: 'PETUGAS' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    lastLoginAt: { type: DataTypes.DATE, field: 'last_login_at' },
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  User.associate = (models) => {
    User.hasMany(models.GraduationPeriod, { foreignKey: 'created_by', as: 'createdPeriods' });
    User.hasMany(models.GraduationResult, { foreignKey: 'created_by', as: 'createdResults' });
    User.hasMany(models.StudentRequirement, { foreignKey: 'verified_by', as: 'verifiedRequirements' });
    User.hasMany(models.SklDocument, { foreignKey: 'uploaded_by', as: 'uploadedDocuments' });
    User.hasMany(models.ImportBatch, { foreignKey: 'imported_by', as: 'importBatches' });
  };

  return User;
};
