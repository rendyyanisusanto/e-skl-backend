'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    classId: { type: DataTypes.BIGINT, field: 'class_id' },
    majorId: { type: DataTypes.BIGINT, field: 'major_id' },
    nis: { type: DataTypes.STRING(50) },
    nisn: { type: DataTypes.STRING(50), allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
    gender: { type: DataTypes.ENUM('L', 'P') },
    birthPlace: { type: DataTypes.STRING(100), field: 'birth_place' },
    birthDate: { type: DataTypes.DATEONLY, field: 'birth_date' },
    parentName: { type: DataTypes.STRING(150), field: 'parent_name' },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING(50) },
    accessToken: { type: DataTypes.STRING(100), unique: true, field: 'access_token' },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
  }, {
    tableName: 'students',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Student.associate = (models) => {
    Student.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    Student.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' });
    Student.belongsTo(models.Major, { foreignKey: 'major_id', as: 'major' });
    Student.hasOne(models.GraduationResult, { foreignKey: 'student_id', as: 'graduationResult' });
    Student.hasMany(models.StudentRequirement, { foreignKey: 'student_id', as: 'requirements' });
    Student.hasOne(models.SklDocument, { foreignKey: 'student_id', as: 'sklDocument' });
    Student.hasMany(models.DownloadLog, { foreignKey: 'student_id', as: 'downloadLogs' });
  };

  return Student;
};
