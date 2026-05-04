const ExcelJS = require('exceljs');
const { Student, GraduationResult, StudentRequirement, RequirementType, Class, Major, ImportBatch, ImportBatchDetail } = require('../models');
const crypto = require('crypto');

const processImport = async (filePath, fileName, graduationPeriodId, userId) => {
  const batch = await ImportBatch.create({ graduationPeriodId, fileName, filePath, status: 'PROCESSING', importedBy: userId });

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.worksheets[0];

  const rows = [];
  sheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1) return; // skip header
    rows.push({ rowIndex, values: row.values });
  });

  let success = 0, failed = 0;
  const details = [];

  const reqTypes = await RequirementType.findAll({ where: { graduationPeriodId, isActive: true } });

  for (const { rowIndex, values } of rows) {
    const [, nis, nisn, name, gender, birth_place, birth_date, class_name, major_code, parent_name, address, phone, graduation_status] = values;

    if (!nisn || !name) {
      failed++;
      details.push({ importBatchId: batch.id, rowNumber: rowIndex, nis: nis || null, nisn: nisn || null, name: name || null, status: 'FAILED', message: 'NISN dan nama wajib diisi.' });
      continue;
    }

    try {
      let classId = null;
      let majorId = null;

      if (major_code) {
        const major = await Major.findOne({ where: { code: String(major_code).trim() } });
        if (!major) throw new Error(`Jurusan dengan kode "${major_code}" tidak ditemukan.`);
        majorId = major.id;

        if (class_name) {
          let cls = await Class.findOne({ where: { name: String(class_name).trim(), graduationPeriodId } });
          if (!cls) cls = await Class.create({ name: String(class_name).trim(), graduationPeriodId, majorId });
          classId = cls.id;
        }
      }

      const existingStudent = await Student.findOne({ where: { graduationPeriodId, nisn: String(nisn).trim() } });

      let student;
      if (existingStudent) {
        await existingStudent.update({ nis: nis ? String(nis).trim() : existingStudent.nis, name: String(name).trim(), gender: gender || null, birthPlace: birth_place || null, birthDate: birth_date || null, classId, majorId, parentName: parent_name || null, address: address || null, phone: phone ? String(phone).trim() : null });
        student = existingStudent;
      } else {
        const accessToken = crypto.randomBytes(32).toString('hex');
        student = await Student.create({ graduationPeriodId, classId, majorId, nis: nis ? String(nis).trim() : null, nisn: String(nisn).trim(), name: String(name).trim(), gender: gender || null, birthPlace: birth_place || null, birthDate: birth_date || null, parentName: parent_name || null, address: address || null, phone: phone ? String(phone).trim() : null, accessToken });

        await GraduationResult.create({ studentId: student.id, graduationPeriodId, status: 'DITUNDA' });
        if (reqTypes.length > 0) {
          await StudentRequirement.bulkCreate(reqTypes.map(rt => ({ studentId: student.id, requirementTypeId: rt.id, status: 'PENDING' })), { ignoreDuplicates: true });
        }
      }

      if (graduation_status && ['LULUS', 'TIDAK_LULUS', 'DITUNDA'].includes(String(graduation_status).toUpperCase())) {
        await GraduationResult.update({ status: String(graduation_status).toUpperCase() }, { where: { studentId: student.id } });
      }

      success++;
      details.push({ importBatchId: batch.id, rowNumber: rowIndex, nis: nis ? String(nis).trim() : null, nisn: String(nisn).trim(), name: String(name).trim(), status: 'SUCCESS', message: existingStudent ? 'Data diperbarui.' : 'Data berhasil diimpor.' });
    } catch (err) {
      failed++;
      details.push({ importBatchId: batch.id, rowNumber: rowIndex, nis: nis ? String(nis) : null, nisn: nisn ? String(nisn) : null, name: name ? String(name) : null, status: 'FAILED', message: err.message });
    }
  }

  await ImportBatchDetail.bulkCreate(details);
  await batch.update({ totalRows: rows.length, successRows: success, failedRows: failed, status: failed === rows.length ? 'FAILED' : 'SUCCESS' });

  return { total_rows: rows.length, success_rows: success, failed_rows: failed, batch_id: batch.id };
};

module.exports = { processImport };
