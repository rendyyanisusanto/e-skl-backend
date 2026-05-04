const studentSvc = require('../../services/studentService');
const importSvc = require('../../services/importService');
const resultSvc = require('../../services/graduationResultService');
const reqTypeSvc = require('../../services/studentRequirementService');
const sklSvc = require('../../services/sklDocumentService');
const { successResponse, errorResponse } = require('../../utils/response');

exports.index = async (req, res, next) => { try { const d = await studentSvc.getAll(req.query); res.json(successResponse('Daftar siswa.', d)); } catch (e) { next(e); } };
exports.show = async (req, res, next) => { try { const d = await studentSvc.getById(req.params.id); res.json(successResponse('Detail siswa.', d)); } catch (e) { next(e); } };
exports.store = async (req, res, next) => { try { const d = await studentSvc.create(req.body); res.status(201).json(successResponse('Siswa berhasil ditambahkan.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await studentSvc.update(req.params.id, req.body); res.json(successResponse('Data siswa berhasil diperbarui.', d)); } catch (e) { next(e); } };
exports.destroy = async (req, res, next) => { try { await studentSvc.deactivate(req.params.id); res.json(successResponse('Siswa berhasil dinonaktifkan.')); } catch (e) { next(e); } };

exports.import = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json(errorResponse('File Excel wajib diupload.'));
    const { graduation_period_id, class_id, major_id } = req.body;
    if (!graduation_period_id) return res.status(400).json(errorResponse('graduation_period_id wajib diisi.'));
    const result = await importSvc.processImport(req.file.path, req.file.originalname, graduation_period_id, class_id, major_id, req.user.id);
    res.json(successResponse('Import selesai.', result));
  } catch (e) { next(e); }
};

exports.updateGraduationResult = async (req, res, next) => { try { const d = await resultSvc.updateResult(req.params.id, req.body, req.user.id); res.json(successResponse('Status kelulusan diperbarui.', d)); } catch (e) { next(e); } };

exports.getRequirements = async (req, res, next) => { try { const d = await reqTypeSvc.getByStudent(req.params.id); res.json(successResponse('Syarat siswa.', d)); } catch (e) { next(e); } };
exports.updateRequirement = async (req, res, next) => { try { const d = await reqTypeSvc.updateRequirement(req.params.id, req.params.requirementTypeId, req.body, req.user.id); res.json(successResponse('Syarat diperbarui.', d)); } catch (e) { next(e); } };
exports.bulkUpdateRequirements = async (req, res, next) => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates)) return res.status(400).json(errorResponse('Data updates harus berupa array.'));
    const d = await reqTypeSvc.bulkUpdate(updates, req.user.id);
    res.json(successResponse('Syarat massal diperbarui.', d));
  } catch (e) { next(e); }
};
exports.generateRequirements = async (req, res, next) => { try { const d = await reqTypeSvc.generateRequirements(req.params.id); res.json(successResponse('Syarat berhasil digenerate.', d)); } catch (e) { next(e); } };

exports.uploadSkl = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json(errorResponse('File PDF wajib diupload.'));
    const d = await sklSvc.upload(req.params.id, req.file, req.body, req.user.id);
    res.status(201).json(successResponse('SKL berhasil diupload.', d));
  } catch (e) { next(e); }
};
exports.getSkl = async (req, res, next) => { try { const d = await sklSvc.getByStudent(req.params.id); res.json(successResponse('Dokumen SKL.', d)); } catch (e) { next(e); } };
exports.updateSkl = async (req, res, next) => { try { const d = await sklSvc.updateStatus(req.params.id, req.body); res.json(successResponse('Dokumen SKL diperbarui.', d)); } catch (e) { next(e); } };
exports.deleteSkl = async (req, res, next) => { try { await sklSvc.remove(req.params.id); res.json(successResponse('Dokumen SKL dinonaktifkan.')); } catch (e) { next(e); } };
