const { GraduationPeriod, User } = require('../models');

const getAll = async () => GraduationPeriod.findAll({
  include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
  order: [['created_at', 'DESC']],
});

const getById = async (id) => {
  const p = await GraduationPeriod.findByPk(id, {
    include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
  });
  if (!p) throw { status: 404, message: 'Periode kelulusan tidak ditemukan.' };
  return p;
};

const create = async (data, userId) => {
  return GraduationPeriod.create({
    academicYear: data.academic_year,
    name: data.name,
    announcementDate: data.announcement_date || null,
    downloadStartAt: data.download_start_at || null,
    downloadEndAt: data.download_end_at || null,
    isPublished: data.is_published !== undefined ? data.is_published : false,
    isActive: true,
    createdBy: userId,
  });
};

const update = async (id, data) => {
  const p = await getById(id);
  const updateData = {};
  if (data.academic_year !== undefined) updateData.academicYear = data.academic_year;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.announcement_date !== undefined) updateData.announcementDate = data.announcement_date || null;
  if (data.download_start_at !== undefined) updateData.downloadStartAt = data.download_start_at || null;
  if (data.download_end_at !== undefined) updateData.downloadEndAt = data.download_end_at || null;
  if (data.is_published !== undefined) updateData.isPublished = data.is_published;
  if (data.is_active !== undefined) updateData.isActive = data.is_active;
  await p.update(updateData);
  return p;
};

const deactivate = async (id) => {
  const p = await getById(id);
  await p.update({ isActive: false });
  return p;
};

module.exports = { getAll, getById, create, update, deactivate };
