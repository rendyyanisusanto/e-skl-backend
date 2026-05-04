'use strict';
module.exports = (sequelize, DataTypes) => {
  const Major = sequelize.define('Major', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
  }, {
    tableName: 'majors',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Major.associate = (models) => {
    Major.hasMany(models.Class, { foreignKey: 'major_id', as: 'classes' });
    Major.hasMany(models.Student, { foreignKey: 'major_id', as: 'students' });
  };

  return Major;
};
