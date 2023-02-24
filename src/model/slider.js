const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const Slider = mongoose.model('sliders', sliderSchema);

module.exports = Slider;