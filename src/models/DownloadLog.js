'use strict';
module.exports = (sequelize, DataTypes) => {
  const DownloadLog = sequelize.define('DownloadLog', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    studentId: { type: DataTypes.BIGINT, allowNull: false, field: 'student_id' },
    sklDocumentId: { type: DataTypes.BIGINT, allowNull: false, field: 'skl_document_id' },
    downloadedAt: { type: DataTypes.DATE, allowNull: false, field: 'downloaded_at' },
    ipAddress: { type: DataTypes.STRING(100), field: 'ip_address' },
    userAgent: { type: DataTypes.TEXT, field: 'user_agent' },
  }, {
    tableName: 'download_logs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  DownloadLog.associate = (models) => {
    DownloadLog.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    DownloadLog.belongsTo(models.SklDocument, { foreignKey: 'skl_document_id', as: 'sklDocument' });
  };

  return DownloadLog;
};
