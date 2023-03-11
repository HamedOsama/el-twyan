const Service = require('../model/services');
const ServerError = require('../utils/ErrorInterface');


const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({}).exec()
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: services
    });
  }
  catch (e) {
    next(e);
  }
}

const searchService = async (req, res, next) => {
  try {
    if (!req.params.title) {
      return next(ServerError.badRequest(401, 'Service title is required'));
    }
    const service = await Service.find({
      $or: [
        { 'title.en': new RegExp(req.params.title, 'i') },
        { 'title.ar': new RegExp(req.params.title, 'i') },

      ]
    });
    if (!service) {
      return next(ServerError.badRequest(401, 'Service not found'))
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: service
    })
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllServices,
  searchService
}