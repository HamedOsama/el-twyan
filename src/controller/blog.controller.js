const Blog = require('../model/blog');
const ServerError = require('../utils/ErrorInterface');

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: blogs,
    })
  } catch (e) {
    next(e);
  }
}

const getBlog = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(ServerError.badRequest(401, 'blog id is required'));
    }
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
      return next(ServerError.badRequest(401, 'blog not found'))
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: blog
    })
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getAllBlogs,
  getBlog
}