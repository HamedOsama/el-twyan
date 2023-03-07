const { Router } = require('express');

const adminController = require('../../controller/admin.controller');
const auth = require('../../middleware/auth');
const uploadImage = require('../../utils/uploadImage');

const router = Router();

// auth 
router.post('/signup', adminController.signUp)
router.post('/login', adminController.login)
router.post('logout', auth, adminController.logout)

router.route('/slider')
  .get(auth, adminController.getAllSliders)
  .post(auth, uploadImage.single('image'), adminController.addSlider)
router.route('/slider/:id')
  .patch(auth, uploadImage.single('image'), adminController.updateSlider)
  .delete(auth, adminController.deleteSlider)

module.exports = router;