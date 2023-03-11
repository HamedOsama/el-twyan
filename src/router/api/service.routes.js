const { Router } = require('express');

const serviceController = require('../../controller/service.controller');

const router = Router();

router.get('/', serviceController.getAllServices);
router.get('/search/:title', serviceController.searchService);

module.exports = router;