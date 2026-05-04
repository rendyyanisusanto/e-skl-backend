const router = require('express').Router();
const ctrl = require('../controllers/public/publicController');

router.get('/school-profile', ctrl.getSchoolProfile);
router.post('/check-skl', ctrl.checkSkl);
router.get('/skl/download/:verificationCode', ctrl.downloadSkl);
router.get('/skl/verify/:verificationCode', ctrl.verifySkl);

module.exports = router;
