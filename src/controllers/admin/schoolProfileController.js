const svc = require('../../services/schoolProfileService');
const { successResponse } = require('../../utils/response');

exports.show = async (req, res, next) => { try { const d = await svc.get(); res.json(successResponse('Profil sekolah.', d)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await svc.update(req.body); res.json(successResponse('Profil sekolah diperbarui.', d)); } catch (e) { next(e); } };
