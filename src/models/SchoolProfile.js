'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolProfile = sequelize.define('SchoolProfile', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    schoolName: { type: DataTypes.STRING(200), allowNull: false, field: 'school_name' },
    npsn: { type: DataTypes.STRING(50) },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(150) },
    website: { type: DataTypes.STRING(150) },
    logoPath: { type: DataTypes.STRING(255), field: 'logo_path' },
  }, {
    tableName: 'school_profiles',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SchoolProfile.associate = () => {};
  return SchoolProfile;
};
