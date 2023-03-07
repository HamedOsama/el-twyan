const {Router} = require('express');

const clientRoutes = require('./api/client.routes');
const serviceRoutes = require('./api/service.routes');
const requestRoutes = require('./api/request.routes');
const applyRoutes = require('./api/apply.routes');
const newsLetterRoutes = require('./api/newsLetter.routes');
const sliderRoutes = require('./api/slider.routes');
const adminRoutes = require('./api/admin.routes');

const router = Router();

router.use('/clients', clientRoutes);
router.use('/services', serviceRoutes);
router.use('/requests', requestRoutes);
router.use('/apply', applyRoutes);
router.use('/news-letter', newsLetterRoutes);
router.use('/slider', sliderRoutes);
router.use('/admin', adminRoutes);

module.exports = router;