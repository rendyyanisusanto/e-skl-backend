const svc = require('../../services/graduationPeriodService');
const { successResponse, errorResponse } = require('../../utils/response');

exports.index = async (req, res, next) => { try { const d = await svc.getAll(); res.json(successResponse('Daftar periode kelulusan.', d)); } catch (e) { next(e); } };
exports.show = async (req, res, next) => { try { const d = await svc.getById(req.params.id); res.json(successResponse('Detail periode.', d)); } catch (e) { next(e); } };
exports.store = async (req, res, next) => { try { const d = await svc.create(req.body, req.user.id); res.status(201).json(successResponse('Periode berhasil dibuat.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await svc.update(req.params.id, req.body); res.json(successResponse('Periode berhasil diperbarui.', d)); } catch (e) { next(e); } };
exports.destroy = async (req, res, next) => { try { await svc.deactivate(req.params.id); res.json(successResponse('Periode berhasil dinonaktifkan.')); } catch (e) { next(e); } };
