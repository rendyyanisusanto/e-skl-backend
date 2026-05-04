const svc = require('../../services/classService');
const { successResponse } = require('../../utils/response');

exports.index = async (req, res, next) => { try { const d = await svc.getAll(req.query); res.json(successResponse('Daftar kelas.', d)); } catch (e) { next(e); } };
exports.show = async (req, res, next) => { try { const d = await svc.getById(req.params.id); res.json(successResponse('Detail kelas.', d)); } catch (e) { next(e); } };
exports.store = async (req, res, next) => { try { const d = await svc.create(req.body); res.status(201).json(successResponse('Kelas berhasil dibuat.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await svc.update(req.params.id, req.body); res.json(successResponse('Kelas berhasil diperbarui.', d)); } catch (e) { next(e); } };
exports.destroy = async (req, res, next) => { try { await svc.remove(req.params.id); res.json(successResponse('Kelas berhasil dihapus.')); } catch (e) { next(e); } };
