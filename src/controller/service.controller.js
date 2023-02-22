const Service = require('../model/services')


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


module.exports = {
  getAllServices
}