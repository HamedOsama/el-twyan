const { Router } = require('express');

const serviceController = require('../../controller/service.controller');

const router = Router();

router.get('/', serviceController.getAllServices);

module.exports = router;