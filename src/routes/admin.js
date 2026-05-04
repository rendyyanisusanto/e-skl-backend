const router = require('express').Router();
const adminRoutes = require('./admin/index');
router.use('/', adminRoutes);
module.exports = router;
