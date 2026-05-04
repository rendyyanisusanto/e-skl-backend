const { Student, GraduationResult, SklDocument, StudentRequirement, RequirementType, DownloadLog } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (periodId) => {
  const where = periodId ? { graduationPeriodId: periodId } : {};

  const totalStudents = await Student.count({ where: { ...where, isActive: true } });

  const totalGraduated = await GraduationResult.count({ where: { status: 'LULUS', ...(periodId ? { graduationPeriodId: periodId } : {}) } });
  const totalNotGraduated = await GraduationResult.count({ where: { status: 'TIDAK_LULUS', ...(periodId ? { graduationPeriodId: periodId } : {}) } });
  const totalPending = await GraduationResult.count({ where: { status: 'DITUNDA', ...(periodId ? { graduationPeriodId: periodId } : {}) } });

  const totalSklUploaded = await SklDocument.count({ where: { status: 'ACTIVE', ...(periodId ? { graduationPeriodId: periodId } : {}) } });
  const totalDownloads = await DownloadLog.count();

  const reqWhere = periodId ? {} : {};
  const totalRequirements = await StudentRequirement.count({ where: reqWhere });
  const totalIncomplete = await StudentRequirement.count({ where: { ...reqWhere, status: 'PENDING' } });

  return {
    total_students: totalStudents,
    total_graduated: totalGraduated,
    total_not_graduated: totalNotGraduated,
    total_pending: totalPending,
    total_skl_uploaded: totalSklUploaded,
    total_downloads: totalDownloads,
    total_requirements: totalRequirements,
    total_incomplete_requirements: totalIncomplete,
  };
};

module.exports = { getDashboardStats };
