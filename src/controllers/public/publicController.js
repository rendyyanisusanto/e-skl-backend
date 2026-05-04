const publicSvc = require('../../services/publicService');
const profileSvc = require('../../services/schoolProfileService');
const { successResponse, errorResponse } = require('../../utils/response');
const fs = require('fs');
const path = require('path');

exports.getSchoolProfile = async (req, res, next) => {
  try {
    const d = await profileSvc.get();
    res.json(successResponse('Profil sekolah.', d));
  } catch (e) { next(e); }
};

exports.checkSkl = async (req, res, next) => {
  try {
    const { nisn, birth_date } = req.body;
    if (!nisn || !birth_date) return res.status(400).json(errorResponse('NISN dan tanggal lahir wajib diisi.'));
    const data = await publicSvc.checkSkl(nisn, birth_date);
    res.json(successResponse('Data ditemukan.', data));
  } catch (e) { next(e); }
};

exports.downloadSkl = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'];
    const sklDoc = await publicSvc.downloadSkl(verificationCode, ip, ua);
    const filePath = path.resolve(sklDoc.filePath);
    if (!fs.existsSync(filePath)) return res.status(404).json(errorResponse('File tidak ditemukan di server.'));
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sklDoc.originalFileName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (e) { next(e); }
};

exports.verifySkl = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'];
    const data = await publicSvc.verifySkl(verificationCode, ip, ua);
    res.json(successResponse('Hasil verifikasi.', data));
  } catch (e) { next(e); }
};
