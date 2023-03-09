const { Router } = require('express');

const blogController = require('../../controller/blog.controller');

const router = Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

module.exports = router;