const { Router } = require('express');

const requestController = require('../../controller/request.controller');

const router = Router();

router.route('/')
.get(requestController.getRequests)
.post(requestController.addRequest);

module.exports = router;