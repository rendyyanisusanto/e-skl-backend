const { Class, Major, GraduationPeriod } = require('../models');
const { Op } = require('sequelize');

const getAll = async ({ graduation_period_id, major_id, search }) => {
  const where = {};
  if (graduation_period_id) where.graduationPeriodId = graduation_period_id;
  if (major_id) where.majorId = major_id;
  if (search) where.name = { [Op.like]: `%${search}%` };
  return Class.findAll({
    where,
    include: [
      { model: Major, as: 'major' },
      { model: GraduationPeriod, as: 'graduationPeriod' },
    ],
    order: [['name', 'ASC']],
  });
};

const getById = async (id) => {
  const c = await Class.findByPk(id, {
    include: [
      { model: Major, as: 'major' },
      { model: GraduationPeriod, as: 'graduationPeriod' },
    ],
  });
  if (!c) throw { status: 404, message: 'Kelas tidak ditemukan.' };
  return c;
};

const create = async (data) => {
  return Class.create({
    graduationPeriodId: data.graduation_period_id,
    majorId: data.major_id || null,
    name: data.name,
    homeroomTeacher: data.homeroom_teacher || null,
  });
};

const update = async (id, data) => {
  const c = await getById(id);
  await c.update({
    graduationPeriodId: data.graduation_period_id !== undefined ? data.graduation_period_id : c.graduationPeriodId,
    majorId: data.major_id !== undefined ? (data.major_id || null) : c.majorId,
    name: data.name !== undefined ? data.name : c.name,
    homeroomTeacher: data.homeroom_teacher !== undefined ? (data.homeroom_teacher || null) : c.homeroomTeacher,
  });
  return c;
};

const remove = async (id) => {
  const c = await getById(id);
  await c.destroy();
};

module.exports = { getAll, getById, create, update, remove };
