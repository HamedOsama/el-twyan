const { Router } = require('express');

const adminController = require('../../controller/admin.controller');
const auth = require('../../middleware/auth');
const uploadImage = require('../../utils/uploadImage');

const router = Router();

// auth 
router.post('/signup', adminController.signUp)
router.post('/login', adminController.login)
router.post('/logout', auth, adminController.logout)
router.get('/auth', auth, adminController.auth)
router.patch('/', auth, adminController.updateProfile)

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

// apply
router.route('/apply').get(auth, adminController.getAllApplies)
router.route('/apply/:id')
  .get(auth, adminController.getApplyById)
  .delete(auth, adminController.deleteApply)

// service
router.route('/service')
  .get(auth, adminController.getAllServices)
  .post(auth, uploadImage.single('image'), adminController.addService)
router.route('/service/:id')
  .get(auth, adminController.getServiceById)
  .patch(auth, uploadImage.single('image'), adminController.updateService)
  .delete(auth, adminController.deleteService)

// contacts 
router.route('/contacts')
  .get(auth, adminController.getContacts)
  .post(auth, adminController.addContact)
router.route('/contacts/:id')
  .patch(auth, adminController.updateContact)

// blogs
router.route('/blog')
  .get(auth, adminController.getAllBlogs)
  .post(auth, uploadImage.single('image'), adminController.addBlog)
router.route('/blog/:id')
  .patch(auth, uploadImage.single('image'), adminController.updateBlog)
  .delete(auth, adminController.deleteBlog)

// information 
router.route('/information')
  .get(auth, adminController.getAllInfo)
  .post(auth, adminController.addInfo)
router.route('/information/:id')
  .patch(auth, adminController.updateInfo)
  .delete(auth, adminController.deleteInfo)
module.exports = router;