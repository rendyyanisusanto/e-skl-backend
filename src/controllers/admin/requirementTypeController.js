const svc = require('../../services/requirementTypeService');
const { successResponse } = require('../../utils/response');

exports.index = async (req, res, next) => { try { const d = await svc.getAll(req.query); res.json(successResponse('Daftar syarat.', d)); } catch (e) { next(e); } };
exports.show = async (req, res, next) => { try { const d = await svc.getById(req.params.id); res.json(successResponse('Detail syarat.', d)); } catch (e) { next(e); } };
exports.store = async (req, res, next) => { try { const d = await svc.create(req.body, req.user.id); res.status(201).json(successResponse('Syarat berhasil dibuat.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await svc.update(req.params.id, req.body); res.json(successResponse('Syarat berhasil diperbarui.', d)); } catch (e) { next(e); } };
exports.destroy = async (req, res, next) => { try { await svc.deactivate(req.params.id); res.json(successResponse('Syarat berhasil dinonaktifkan.')); } catch (e) { next(e); } };
