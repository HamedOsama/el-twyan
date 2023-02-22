const { Router } = require('express');

const newLetterController = require('../../controller/newsLetter.controller');

const router = Router();

router.post('/', newLetterController.addNewsLetter);

module.exports = router;