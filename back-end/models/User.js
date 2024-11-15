const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password_hash: {
        type: String,
        required: true,
      },
      // roles: {
      //   type: String,
      //   enum: ['editer', 'admin', 'user'],
      //   default: ['user'],
      //   // required: true,
      // },
      isAdmin: {
        type: Boolean,
        default: false,
      },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)