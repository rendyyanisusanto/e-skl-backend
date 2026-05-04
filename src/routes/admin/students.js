const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const { uploadImport, uploadSKL } = require('../../middlewares/upload');
const ctrl = require('../../controllers/admin/studentController');

router.use(authenticate);

router.get('/', ctrl.index);
router.post('/', ctrl.store);
router.post('/import', uploadImport.single('file'), ctrl.import);
router.get('/:id', ctrl.show);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

router.put('/:id/graduation-result', ctrl.updateGraduationResult);

router.get('/:id/requirements', ctrl.getRequirements);
router.put('/:id/requirements/:requirementTypeId', ctrl.updateRequirement);
router.post('/:id/requirements/generate', ctrl.generateRequirements);

router.post('/:id/skl/upload', uploadSKL.single('file'), ctrl.uploadSkl);
router.get('/:id/skl', ctrl.getSkl);
router.put('/:id/skl', ctrl.updateSkl);
router.delete('/:id/skl', ctrl.deleteSkl);

module.exports = router;
