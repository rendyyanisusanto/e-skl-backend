const { errorResponse } = require('../utils/response');

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(errorResponse('Anda tidak memiliki akses ke resource ini.'));
    }
    next();
  };
};

module.exports = authorizeRoles;
