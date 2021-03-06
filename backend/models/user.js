const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      trim: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
          if(!validator.isEmail(value)) {
              throw new Error('Invalid e-mail address')
          }
      }
  },
  password:{
      type: String,
      required: true,
      trim: true,
      validate(value) {
          if(value.toLowerCase().includes('password') || value.length<6) {
              throw new Error('Invalid password')
          }
      }
  }
})
userSchema.pre('save', async function(next) {
  const user = this
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})
const User = mongoose.model('User', userSchema)
module.exports = User;
