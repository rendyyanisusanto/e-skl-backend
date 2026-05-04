const { DownloadLog, VerificationLog, Student, SklDocument, GraduationPeriod } = require('../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');

const getDownloadLogs = async ({ graduation_period_id, student_id, date_from, date_to, search, page = 1, limit = 20 }) => {
  const where = {};
  if (student_id) where.studentId = student_id;
  if (date_from || date_to) {
    where.downloadedAt = {};
    if (date_from) where.downloadedAt[Op.gte] = dayjs(date_from).startOf('day').toDate();
    if (date_to) where.downloadedAt[Op.lte] = dayjs(date_to).endOf('day').toDate();
  }

  const include = [
    { model: Student, as: 'student', attributes: ['id', 'name', 'nisn', 'nis'], where: search ? { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { nisn: { [Op.like]: `%${search}%` } }] } : undefined, required: !!search },
    { model: SklDocument, as: 'sklDocument', attributes: ['id', 'verificationCode'] },
  ];

  if (graduation_period_id) {
    include[0].include = [{ model: GraduationPeriod, as: 'graduationPeriod', where: { id: graduation_period_id }, required: true }];
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const { count, rows } = await DownloadLog.findAndCountAll({ where, include, limit: parseInt(limit), offset, order: [['downloaded_at', 'DESC']], distinct: true });
  return { total: count, page: parseInt(page), limit: parseInt(limit), data: rows };
};

const getVerificationLogs = async ({ page = 1, limit = 20, search }) => {
  const include = [{ model: SklDocument, as: 'sklDocument', attributes: ['id', 'verificationCode', 'documentNumber'] }];
  const where = search ? { verificationCode: { [Op.like]: `%${search}%` } } : {};
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const { count, rows } = await VerificationLog.findAndCountAll({ where, include, limit: parseInt(limit), offset, order: [['checked_at', 'DESC']], distinct: true });
  return { total: count, page: parseInt(page), limit: parseInt(limit), data: rows };
};

module.exports = { getDownloadLogs, getVerificationLogs };
