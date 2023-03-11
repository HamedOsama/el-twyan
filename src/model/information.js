const mongoose = require('mongoose')
const informationSchema = mongoose.Schema({
  title: {
    ar: {
      type: String,
      trim: true,
      unique: true,

    },
    en: {
      type: String,
      trim: true,
      unique: true,
    }
  },
  description: {
    ar: {
      type: String,
      trim: true,
    },
    en: {
      type: String,
      trim: true,
    },
  },
});
const Info = mongoose.model('Information', informationSchema);
module.exports = Info;