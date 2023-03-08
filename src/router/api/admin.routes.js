const { Router } = require('express');

const adminController = require('../../controller/admin.controller');
const auth = require('../../middleware/auth');
const uploadImage = require('../../utils/uploadImage');

const router = Router();

// auth 
router.post('/signup', adminController.signUp)
router.post('/login', adminController.login)
router.post('logout', auth, adminController.logout)

//slider
router.route('/slider')
  .get(auth, adminController.getAllSliders)
  .post(auth, uploadImage.single('image'), adminController.addSlider)
router.route('/slider/:id')
  .patch(auth, uploadImage.single('image'), adminController.updateSlider)
  .delete(auth, adminController.deleteSlider)

//client 
router.route('/client').get(auth, adminController.getAllClients).post(auth, uploadImage.single('image'), adminController.addClient)
router.route('/client/:id').patch(auth, uploadImage.single('image'), adminController.updateClient).delete(auth, adminController.deleteClient)

//newsletters
router.route('/newsletter').get(auth, adminController.getAllNewsLetters)

// request
router.route('/request').get(auth, adminController.getAllRequests)
router.route('/request/:id')
  .get(auth, adminController.getRequestById)
  .patch(auth, adminController.updateRequest)
  .delete(auth, adminController.deleteRequest)
module.exports = router;