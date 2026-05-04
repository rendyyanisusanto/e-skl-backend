'use strict';
module.exports = (sequelize, DataTypes) => {
  const SklDocument = sequelize.define('SklDocument', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.BIGINT, allowNull: false, unique: true, field: 'student_id' },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    documentNumber: { type: DataTypes.STRING(150), field: 'document_number' },
    verificationCode: { type: DataTypes.STRING(100), allowNull: false, unique: true, field: 'verification_code' },
    originalFileName: { type: DataTypes.STRING(255), allowNull: false, field: 'original_file_name' },
    filePath: { type: DataTypes.STRING(255), allowNull: false, field: 'file_path' },
    fileSize: { type: DataTypes.BIGINT, field: 'file_size' },
    mimeType: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'application/pdf', field: 'mime_type' },
    status: { type: DataTypes.ENUM('ACTIVE', 'LOCKED', 'VOID'), allowNull: false, defaultValue: 'ACTIVE' },
    notes: { type: DataTypes.TEXT },
    uploadedBy: { type: DataTypes.BIGINT, field: 'uploaded_by' },
    uploadedAt: { type: DataTypes.DATE, field: 'uploaded_at' },
  }, {
    tableName: 'skl_documents',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  SklDocument.associate = (models) => {
    SklDocument.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    SklDocument.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    SklDocument.belongsTo(models.User, { foreignKey: 'uploaded_by', as: 'uploader' });
    SklDocument.hasMany(models.DownloadLog, { foreignKey: 'skl_document_id', as: 'downloadLogs' });
    SklDocument.hasMany(models.VerificationLog, { foreignKey: 'skl_document_id', as: 'verificationLogs' });
  };

  return SklDocument;
};
