const router = require('express').Router();
const ctrl = require('../../controllers/admin/authController');
const authenticate = require('../../middlewares/authenticate');

router.post('/login', ctrl.login);
router.get('/me', authenticate, ctrl.me);
router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
