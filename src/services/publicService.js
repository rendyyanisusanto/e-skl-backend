const { Student, SklDocument, GraduationPeriod, GraduationResult, Class, Major, DownloadLog, VerificationLog, StudentRequirement, RequirementType } = require('../models');
const { checkSklDownloadEligibility } = require('./sklAccessService');
const dayjs = require('dayjs');

const checkSkl = async (nisn, birthDate) => {
  const student = await Student.findOne({
    where: { nisn, isActive: true },
    include: [
      { model: Class, as: 'class', attributes: ['id', 'name'] },
      { model: Major, as: 'major', attributes: ['id', 'code', 'name'] },
      { model: GraduationPeriod, as: 'graduationPeriod' },
      { model: GraduationResult, as: 'graduationResult' },
      { model: SklDocument, as: 'sklDocument', attributes: ['id', 'status', 'verificationCode'] },
      { model: StudentRequirement, as: 'requirements', include: [{ model: RequirementType, as: 'requirementType' }] },
    ],
    order: [['id', 'DESC']],
  });

  if (!student) throw { status: 404, message: 'Data siswa tidak ditemukan.' };
  if (student.birthDate && dayjs(student.birthDate).format('YYYY-MM-DD') !== dayjs(birthDate).format('YYYY-MM-DD')) {
    throw { status: 404, message: 'Data siswa tidak ditemukan.' };
  }

  const eligibility = await checkSklDownloadEligibility(student.id);
  const sklDoc = student.sklDocument;

  return {
    student: { name: student.name, nis: student.nis, nisn: student.nisn, class: student.class?.name, major: student.major?.name },
    graduation_status: student.graduationResult?.status || 'BELUM_ADA',
    can_download: eligibility.can_download,
    reasons: eligibility.reasons,
    requirements: student.requirements.map(r => ({ name: r.requirementType?.name, status: r.status })),
    skl: {
      available: !!sklDoc && sklDoc.status === 'ACTIVE',
      verification_code: sklDoc?.verificationCode || null,
      download_url: sklDoc ? `/api/v1/public/skl/download/${sklDoc.verificationCode}` : null,
    },
  };
};

const downloadSkl = async (verificationCode, ipAddress, userAgent) => {
  const sklDoc = await SklDocument.findOne({ where: { verificationCode }, include: [{ model: Student, as: 'student' }] });
  if (!sklDoc) throw { status: 404, message: 'Dokumen tidak ditemukan.' };

  const eligibility = await checkSklDownloadEligibility(sklDoc.studentId);
  if (!eligibility.can_download) throw { status: 422, message: `Tidak dapat mendownload SKL. ${eligibility.reasons.join(' ')}` };

  await DownloadLog.create({ studentId: sklDoc.studentId, sklDocumentId: sklDoc.id, downloadedAt: new Date(), ipAddress, userAgent });
  return sklDoc;
};

const verifySkl = async (verificationCode, ipAddress, userAgent) => {
  const sklDoc = await SklDocument.findOne({
    where: { verificationCode },
    include: [{ model: Student, as: 'student', include: [{ model: Class, as: 'class' }, { model: Major, as: 'major' }, { model: GraduationResult, as: 'graduationResult' }, { model: GraduationPeriod, as: 'graduationPeriod' }] }],
  });

  if (!sklDoc) {
    return { valid: false, message: 'Kode verifikasi tidak ditemukan.' };
  }

  await VerificationLog.create({ sklDocumentId: sklDoc.id, verificationCode, checkedAt: new Date(), ipAddress, userAgent });

  const s = sklDoc.student;
  const nisn = s.nisn;
  const maskedNisn = nisn ? nisn.slice(0, 3) + '****' + nisn.slice(-3) : null;

  return {
    valid: sklDoc.status === 'ACTIVE',
    student: { name: s?.name, nisn: maskedNisn, class: s?.class?.name, major: s?.major?.name, graduation_status: s?.graduationResult?.status },
    document: { status: sklDoc.status, document_number: sklDoc.documentNumber, period: s?.graduationPeriod?.name },
  };
};

module.exports = { checkSkl, downloadSkl, verifySkl };
