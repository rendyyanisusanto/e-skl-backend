const { GraduationResult } = require('../models');

const updateResult = async (studentId, { status, notes }, userId) => {
  let result = await GraduationResult.findOne({ where: { studentId } });
  if (!result) throw { status: 404, message: 'Data kelulusan tidak ditemukan.' };

  const updateData = { status, notes, createdBy: userId };
  if (status === 'LULUS' && !result.publishedAt) updateData.publishedAt = new Date();

  await result.update(updateData);
  return result;
};

module.exports = { updateResult };
