const { RequirementType, StudentRequirement, Student } = require('../models');

const getAll = async ({ graduation_period_id }) => {
  const where = {};
  if (graduation_period_id) where.graduationPeriodId = graduation_period_id;
  return RequirementType.findAll({ where, order: [['sort_order', 'ASC']] });
};

const getById = async (id) => {
  const rt = await RequirementType.findByPk(id);
  if (!rt) throw { status: 404, message: 'Syarat tidak ditemukan.' };
  return rt;
};

const create = async (data, userId) => {
  const rt = await RequirementType.create({
    graduationPeriodId: data.graduation_period_id,
    name: data.name,
    description: data.description || null,
    isRequired: data.is_required !== undefined ? data.is_required : true,
    sortOrder: data.sort_order !== undefined ? data.sort_order : 0,
    isActive: true,
    createdBy: userId,
  });

  // Auto create student requirements for all students in period
  const students = await Student.findAll({
    where: { graduationPeriodId: rt.graduationPeriodId, isActive: true },
  });
  if (students.length > 0) {
    await StudentRequirement.bulkCreate(
      students.map(s => ({ studentId: s.id, requirementTypeId: rt.id, status: 'PENDING' })),
      { ignoreDuplicates: true }
    );
  }
  return rt;
};

const update = async (id, data) => {
  const rt = await getById(id);
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.is_required !== undefined) updateData.isRequired = data.is_required;
  if (data.sort_order !== undefined) updateData.sortOrder = data.sort_order;
  if (data.is_active !== undefined) updateData.isActive = data.is_active;
  await rt.update(updateData);
  return rt;
};

const deactivate = async (id) => {
  const rt = await getById(id);
  await rt.update({ isActive: false });
  return rt;
};

module.exports = { getAll, getById, create, update, deactivate };
