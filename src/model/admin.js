const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('please enter valid Email')
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 6,
    validate(value) {
      let strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
      if (!strongPass.test(value))
        throw new Error("Paasword must contain at least one capital/small letter & specail charcater and number")
    }
  },
  tokens: [{
    type: String,
    required: true
  }]

})
adminSchema.pre('save', async function () {
  const admin = this
  if (admin.isModified('password')) {
    admin.password = await bcryptjs.hash(admin.password, 8)
  }
})
adminSchema.methods.generateToken = async function () {
  const admin = this
  const token = jwt.sign({ _id: admin._id }, 'PROJECT')
  admin.tokens = admin.tokens.concat(token)
  await admin.save()
  return token
}
adminSchema.statics.Login = async function (email, password) {
  const admin = await Admin.findOne({ email })
  if (!admin)
    throw new Error('password or email is wrong!')

  const isMatch = await bcryptjs.compare(password, admin.password)
  if (!isMatch)
    throw new Error('password or email is wrong!')

  return admin
}
const Admin = mongoose.model('admins', adminSchema)
module.exports = Admin