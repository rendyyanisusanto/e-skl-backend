'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImportBatch = sequelize.define('ImportBatch', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    graduationPeriodId: { type: DataTypes.BIGINT, allowNull: false, field: 'graduation_period_id' },
    fileName: { type: DataTypes.STRING(255), field: 'file_name' },
    filePath: { type: DataTypes.STRING(255), field: 'file_path' },
    totalRows: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'total_rows' },
    successRows: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'success_rows' },
    failedRows: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'failed_rows' },
    status: { type: DataTypes.ENUM('PROCESSING', 'SUCCESS', 'FAILED'), allowNull: false, defaultValue: 'PROCESSING' },
    notes: { type: DataTypes.TEXT },
    importedBy: { type: DataTypes.BIGINT, field: 'imported_by' },
  }, {
    tableName: 'import_batches',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  ImportBatch.associate = (models) => {
    ImportBatch.belongsTo(models.GraduationPeriod, { foreignKey: 'graduation_period_id', as: 'graduationPeriod' });
    ImportBatch.belongsTo(models.User, { foreignKey: 'imported_by', as: 'importer' });
    ImportBatch.hasMany(models.ImportBatchDetail, { foreignKey: 'import_batch_id', as: 'details' });
  };
  return ImportBatch;
};
