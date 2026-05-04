const logSvc = require('../../services/logService');
const { successResponse } = require('../../utils/response');

exports.downloadLogs = async (req, res, next) => { try { const d = await logSvc.getDownloadLogs(req.query); res.json(successResponse('Log download.', d)); } catch (e) { next(e); } };
exports.verificationLogs = async (req, res, next) => { try { const d = await logSvc.getVerificationLogs(req.query); res.json(successResponse('Log verifikasi.', d)); } catch (e) { next(e); } };
