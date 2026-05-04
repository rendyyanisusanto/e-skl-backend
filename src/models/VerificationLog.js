'use strict';
module.exports = (sequelize, DataTypes) => {
  const VerificationLog = sequelize.define('VerificationLog', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    sklDocumentId: { type: DataTypes.BIGINT, allowNull: false, field: 'skl_document_id' },
    verificationCode: { type: DataTypes.STRING(100), allowNull: false, field: 'verification_code' },
    checkedAt: { type: DataTypes.DATE, allowNull: false, field: 'checked_at' },
    ipAddress: { type: DataTypes.STRING(100), field: 'ip_address' },
    userAgent: { type: DataTypes.TEXT, field: 'user_agent' },
  }, {
    tableName: 'verification_logs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  VerificationLog.associate = (models) => {
    VerificationLog.belongsTo(models.SklDocument, { foreignKey: 'skl_document_id', as: 'sklDocument' });
  };
  return VerificationLog;
};
