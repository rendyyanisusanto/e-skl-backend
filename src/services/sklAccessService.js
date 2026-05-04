const { Student, GraduationPeriod, GraduationResult, RequirementType, StudentRequirement, SklDocument } = require('../models');
const fs = require('fs');
const dayjs = require('dayjs');

const checkSklDownloadEligibility = async (studentId) => {
  const reasons = [];
  const missingReqs = [];

  const student = await Student.findByPk(studentId, {
    include: [
      { model: GraduationPeriod, as: 'graduationPeriod' },
      { model: GraduationResult, as: 'graduationResult' },
      { model: SklDocument, as: 'sklDocument' },
      { model: StudentRequirement, as: 'requirements', include: [{ model: RequirementType, as: 'requirementType' }] },
    ],
  });

  if (!student) return { can_download: false, reasons: ['Siswa tidak ditemukan.'], missing_requirements: [] };

  // Rule 1: Student active
  if (!student.isActive) reasons.push('Akun siswa tidak aktif.');

  const period = student.graduationPeriod;
  if (!period) { reasons.push('Periode kelulusan tidak ditemukan.'); return { can_download: false, reasons, missing_requirements: missingReqs }; }

  // Rule 2: Period active
  if (!period.isActive) reasons.push('Periode kelulusan tidak aktif.');

  // Rule 3: Period published
  if (!period.isPublished) reasons.push('Periode kelulusan belum dipublish.');

  // Rule 4: Download start
  const now = dayjs();
  if (period.downloadStartAt && now.isBefore(dayjs(period.downloadStartAt))) {
    reasons.push(`Jadwal download belum dibuka (mulai: ${dayjs(period.downloadStartAt).format('DD MMM YYYY HH:mm')}).`);
  }

  // Rule 5: Download end
  if (period.downloadEndAt && now.isAfter(dayjs(period.downloadEndAt))) {
    reasons.push(`Jadwal download sudah ditutup (akhir: ${dayjs(period.downloadEndAt).format('DD MMM YYYY HH:mm')}).`);
  }

  // Rule 6 & 7: Graduation result LULUS
  if (!student.graduationResult) {
    reasons.push('Data kelulusan belum ada.');
  } else if (student.graduationResult.status !== 'LULUS') {
    reasons.push(`Siswa belum dinyatakan lulus (status: ${student.graduationResult.status}).`);
  }

  // Rule 8: Required requirements
  const requiredTypes = await RequirementType.findAll({ where: { graduationPeriodId: period.id, isRequired: true, isActive: true } });
  for (const rt of requiredTypes) {
    const req = student.requirements.find(r => r.requirementTypeId == rt.id);
    if (!req || !['COMPLETED', 'WAIVED'].includes(req.status)) {
      missingReqs.push(rt.name);
    }
  }
  if (missingReqs.length > 0) reasons.push(`Syarat wajib belum terpenuhi: ${missingReqs.join(', ')}.`);

  // Rule 9 & 10: SKL document
  const sklDoc = student.sklDocument;
  if (!sklDoc) {
    reasons.push('File SKL belum diupload oleh petugas.');
  } else if (sklDoc.status !== 'ACTIVE') {
    reasons.push(`Dokumen SKL tidak aktif (status: ${sklDoc.status}).`);
  } else if (!fs.existsSync(sklDoc.filePath)) {
    // Rule 11: File exists
    reasons.push('File SKL tidak tersedia di server.');
  }

  return { can_download: reasons.length === 0, reasons, missing_requirements: missingReqs };
};

module.exports = { checkSklDownloadEligibility };
