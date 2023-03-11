const { Router } = require('express');

const informationController = require('../../controller/information.controller');

const router = Router();

router.route('/').get(informationController.getAllInformation);
router.route('/:name').get(informationController.getInformation);
router.route('/search/:title').get(informationController.searchInformation);

module.exports = router;