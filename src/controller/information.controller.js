const Information = require('../model/information');
const ServerError = require('../utils/ErrorInterface');

const getAllInformation = async (req, res, next) => {
  try {
    const information = await Information.find({});
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: information,
    })
  } catch (e) {
    next(e);
  }
}

const getInformation = async (req, res, next) => {
  try {
    if (!req.params.name) {
      return next(ServerError.badRequest(401, 'information name is required'));
    }
    const information = await Information.find({
      $or: [
        { 'title.en': req.params.name },
        { 'title.ar': req.params.name },
      ]
    });
    if (!information) {
      return next(ServerError.badRequest(401, 'information not found'))
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      body: information
    })
  } catch (e) {
    next(e);
  }
}



module.exports = {
  getAllInformation,
  getInformation,
  
}