const mongoose = require('mongoose')
const validator = require('validator')
const newsLetterSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    index : true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('هذا البريد الإلكتروني غير صالح الرجاء إدخال بريد إلكتروني آخر')
    }
  }
})
const NewsLetter = mongoose.model('newsLetters', newsLetterSchema)

module.exports = NewsLetter;