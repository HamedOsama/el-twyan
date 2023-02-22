const { Router } = require('express');

const applyController = require('../../controller/apply.controller');

const router = Router();

router.post('/', applyController.uploadCv.single('resume'), applyController.applyToJob);

module.exports = router;