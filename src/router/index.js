const {Router} = require('express');

const clientRoutes = require('./api/client.routes');
const serviceRoutes = require('./api/service.routes');
const requestRoutes = require('./api/request.routes');
const applyRoutes = require('./api/apply.routes');
const newsLetterRoutes = require('./api/newsLetter.routes');

const router = Router();

router.use('/clients', clientRoutes);
router.use('/services', serviceRoutes);
router.use('/requests', requestRoutes);
router.use('/apply', applyRoutes);
router.use('/news-letter', newsLetterRoutes);

module.exports = router;