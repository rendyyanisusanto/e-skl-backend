'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    majorId: { type: DataTypes.BIGINT, field: 'major_id' },
    name: { type: DataTypes.STRING(100), allowNull: false },
    homeroomTeacher: { type: DataTypes.STRING(150), field: 'homeroom_teacher' },
  }, {
    tableName: 'classes',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Class.associate = (models) => {
    Class.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    Class.belongsTo(models.Major, { foreignKey: 'major_id', as: 'major' });
    Class.hasMany(models.Student, { foreignKey: 'class_id', as: 'students' });
  };

  return Class;
};
