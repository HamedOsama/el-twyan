const { Router } = require('express');

const adminController = require('../../controller/admin.controller');
const auth = require('../../middleware/auth');
const uploadImage = require('../../utils/uploadImage');

const router = Router();

// auth 
router.post('/signup', adminController.signUp)
router.post('/login', auth, adminController.login)
router.post('logout', auth, adminController.logout)

router.route('/slider')
  .get(auth, adminController.getAllSliders).post(auth, uploadImage.single('image'), adminController.addSlider);

module.exports = router;