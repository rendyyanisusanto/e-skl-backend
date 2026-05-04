const { SklDocument, Student, GraduationPeriod } = require('../models');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const generateVerificationCode = () => `SKL-${dayjs().format('YYYYMMDD')}-${uuidv4().split('-')[0].toUpperCase()}`;

const upload = async (studentId, file, { document_number, notes }, userId) => {
  const student = await Student.findByPk(studentId);
  if (!student) throw { status: 404, message: 'Siswa tidak ditemukan.' };

  const existing = await SklDocument.findOne({ where: { studentId } });

  if (existing) {
    // Delete old file if it exists
    if (existing.filePath && fs.existsSync(existing.filePath)) {
      fs.unlinkSync(existing.filePath);
    }
    await existing.update({
      documentNumber: document_number || null,
      verificationCode: generateVerificationCode(),
      originalFileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
      status: 'ACTIVE',
      notes: notes || null,
      uploadedBy: userId,
      uploadedAt: new Date(),
    });
    return existing;
  }

  return SklDocument.create({
    studentId,
    graduationPeriodId: student.graduationPeriodId,
    documentNumber: document_number || null,
    verificationCode: generateVerificationCode(),
    originalFileName: file.originalname,
    filePath: file.path,
    fileSize: file.size,
    mimeType: file.mimetype,
    status: 'ACTIVE',
    notes: notes || null,
    uploadedBy: userId,
    uploadedAt: new Date(),
  });
};

const getByStudent = async (studentId) => {
  const doc = await SklDocument.findOne({ where: { studentId } });
  if (!doc) throw { status: 404, message: 'Dokumen SKL tidak ditemukan.' };
  return doc;
};

const updateStatus = async (studentId, { status, notes }) => {
  const doc = await SklDocument.findOne({ where: { studentId } });
  if (!doc) throw { status: 404, message: 'Dokumen SKL tidak ditemukan.' };
  await doc.update({ status, notes: notes !== undefined ? notes : doc.notes });
  return doc;
};

const remove = async (studentId) => {
  const doc = await SklDocument.findOne({ where: { studentId } });
  if (!doc) throw { status: 404, message: 'Dokumen SKL tidak ditemukan.' };
  await doc.update({ status: 'VOID' });
  return doc;
};

module.exports = { upload, getByStudent, updateStatus, remove };
