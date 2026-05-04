const svc = require('../../services/majorService');
const { successResponse } = require('../../utils/response');

exports.index = async (req, res, next) => { try { const d = await svc.getAll(); res.json(successResponse('Daftar jurusan.', d)); } catch (e) { next(e); } };
exports.show = async (req, res, next) => { try { const d = await svc.getById(req.params.id); res.json(successResponse('Detail jurusan.', d)); } catch (e) { next(e); } };
exports.store = async (req, res, next) => { try { const d = await svc.create(req.body); res.status(201).json(successResponse('Jurusan berhasil dibuat.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await svc.update(req.params.id, req.body); res.json(successResponse('Jurusan berhasil diperbarui.', d)); } catch (e) { next(e); } };
exports.destroy = async (req, res, next) => { try { await svc.deactivate(req.params.id); res.json(successResponse('Jurusan berhasil dinonaktifkan.')); } catch (e) { next(e); } };
