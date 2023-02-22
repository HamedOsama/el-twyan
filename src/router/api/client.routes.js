const { Router } = require('express');

const clientController = require('../../controller/client.controller');

const router = Router();

router.get('/', clientController.getAllClients);

module.exports = router;