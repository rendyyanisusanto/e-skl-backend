const dashboardService = require('../../services/dashboardService');
const { successResponse } = require('../../utils/response');

exports.index = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardStats(req.query.graduation_period_id);
    res.json(successResponse('Data dashboard.', data));
  } catch (err) { next(err); }
};
