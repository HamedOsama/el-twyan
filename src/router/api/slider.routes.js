const { Router } = require('express');

const sliderController = require('../../controller/slider.controller');

const router = Router();

router.get('/', sliderController.getSlider);

module.exports = router;