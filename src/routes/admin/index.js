const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');

router.use(authenticate);

// Graduation Periods
const gpCtrl = require('../../controllers/admin/graduationPeriodController');
const gpRouter = require('express').Router();
gpRouter.get('/', gpCtrl.index);
gpRouter.post('/', gpCtrl.store);
gpRouter.get('/:id', gpCtrl.show);
gpRouter.put('/:id', gpCtrl.update);
gpRouter.delete('/:id', gpCtrl.destroy);
router.use('/graduation-periods', gpRouter);

// Majors
const majorCtrl = require('../../controllers/admin/majorController');
const majorRouter = require('express').Router();
majorRouter.get('/', majorCtrl.index);
majorRouter.post('/', majorCtrl.store);
majorRouter.get('/:id', majorCtrl.show);
majorRouter.put('/:id', majorCtrl.update);
majorRouter.delete('/:id', majorCtrl.destroy);
router.use('/majors', majorRouter);

// Classes
const classCtrl = require('../../controllers/admin/classController');
const classRouter = require('express').Router();
classRouter.get('/', classCtrl.index);
classRouter.post('/', classCtrl.store);
classRouter.get('/:id', classCtrl.show);
classRouter.put('/:id', classCtrl.update);
classRouter.delete('/:id', classCtrl.destroy);
router.use('/classes', classRouter);

// Requirement Types
const rtCtrl = require('../../controllers/admin/requirementTypeController');
const rtRouter = require('express').Router();
rtRouter.get('/', rtCtrl.index);
rtRouter.post('/', rtCtrl.store);
rtRouter.get('/:id', rtCtrl.show);
rtRouter.put('/:id', rtCtrl.update);
rtRouter.delete('/:id', rtCtrl.destroy);
router.use('/requirement-types', rtRouter);

// Dashboard
const dashCtrl = require('../../controllers/admin/dashboardController');
router.get('/dashboard', dashCtrl.index);

// Logs
const logCtrl = require('../../controllers/admin/logController');
router.get('/download-logs', logCtrl.downloadLogs);
router.get('/verification-logs', logCtrl.verificationLogs);

// School Profile
const spCtrl = require('../../controllers/admin/schoolProfileController');
router.get('/school-profile', spCtrl.show);
router.put('/school-profile', spCtrl.update);

// Students (mounted separately)
router.use('/students', require('./students'));

module.exports = router;
