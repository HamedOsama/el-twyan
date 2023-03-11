const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  title: {
    en: {
      type: String,
      trim: true,
      required: true,
    },
    ar: {
      type: String,
      trim: true,
      required: true,
    }
  },
  description: {
    en: {
      type: String,
      trim: true,
      required: true,
    },
    ar: {
      type: String,
      trim: true,
      required: true,
    }
  },
  image: {
    type: String,
  }
}, { timestamps: true })

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog