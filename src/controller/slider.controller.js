const Slider = require('../model/slider');

const getSlider = async (req, res, next) => {
  try {
    const slider = await Slider.find({}).exec();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'succeeded',
      data: slider
    });
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  getSlider
}