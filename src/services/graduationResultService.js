const { GraduationResult } = require('../models');

const updateResult = async (studentId, { status, notes }, userId) => {
  let result = await GraduationResult.findOne({ where: { studentId } });
  if (!result) throw { status: 404, message: 'Data kelulusan tidak ditemukan.' };

  const updateData = { status, notes, createdBy: userId };
  if (status === 'LULUS' && !result.publishedAt) updateData.publishedAt = new Date();

  await result.update(updateData);
  return result;
};

const bulkUpdateResults = async (updates, userId) => {
  // updates is an array of { studentId, status }
  const results = [];
  for (const update of updates) {
    let result = await GraduationResult.findOne({ where: { studentId: update.studentId } });
    if (result) {
      const updateData = { status: update.status, createdBy: userId };
      if (update.status === 'LULUS' && !result.publishedAt) updateData.publishedAt = new Date();
      await result.update(updateData);
      results.push(result);
    }
  }
  return results;
};

module.exports = { updateResult, bulkUpdateResults };
