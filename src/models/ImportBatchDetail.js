'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImportBatchDetail = sequelize.define('ImportBatchDetail', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    importBatchId: { type: DataTypes.BIGINT, allowNull: false, field: 'import_batch_id' },
    rowNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'row_number' },
    nis: { type: DataTypes.STRING(50) },
    nisn: { type: DataTypes.STRING(50) },
    name: { type: DataTypes.STRING(150) },
    status: { type: DataTypes.ENUM('SUCCESS', 'FAILED'), allowNull: false },
    message: { type: DataTypes.TEXT },
  }, {
    tableName: 'import_batch_details',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  ImportBatchDetail.associate = (models) => {
    ImportBatchDetail.belongsTo(models.ImportBatch, { foreignKey: 'import_batch_id', as: 'importBatch' });
  };
  return ImportBatchDetail;
};
