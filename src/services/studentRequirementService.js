const { StudentRequirement, RequirementType, Student } = require('../models');

const getByStudent = async (studentId) => {
  return StudentRequirement.findAll({
    where: { studentId },
    include: [{ model: RequirementType, as: 'requirementType' }],
    order: [[{ model: RequirementType, as: 'requirementType' }, 'sort_order', 'ASC']],
  });
};

const updateRequirement = async (studentId, requirementTypeId, { status, notes }, userId) => {
  let req = await StudentRequirement.findOne({ where: { studentId, requirementTypeId } });
  if (!req) throw { status: 404, message: 'Data syarat tidak ditemukan.' };

  const updateData = { status, notes, verifiedBy: userId };
  if (['COMPLETED', 'WAIVED'].includes(status)) updateData.completedAt = new Date();
  else updateData.completedAt = null;

  await req.update(updateData);
  return req;
};

const generateRequirements = async (studentId, userId) => {
  const student = await Student.findByPk(studentId);
  if (!student) throw { status: 404, message: 'Siswa tidak ditemukan.' };
  const reqTypes = await RequirementType.findAll({ where: { graduationPeriodId: student.graduationPeriodId, isActive: true } });
  await StudentRequirement.bulkCreate(reqTypes.map(rt => ({ studentId, requirementTypeId: rt.id, status: 'PENDING' })), { ignoreDuplicates: true });
  return getByStudent(studentId);
};

module.exports = { getByStudent, updateRequirement, generateRequirements };
