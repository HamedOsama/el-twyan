const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
  image: {
    type: String,
  },
  text: {
    en: {
      type: String,
      required: true
    },
    ar: {
      type: String,
      required: true
    }

  }
})

const Slider = mongoose.model('sliders', sliderSchema);

module.exports = Slider;