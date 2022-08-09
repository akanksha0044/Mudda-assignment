const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')//for hashing
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  // course: {
  //   type: String,
  //   required: true
  // },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  // country: [
  //   {
  //     type: String,
  //     required: true
  //   }
  // ],
  // date: {
  //   type: Date
  // }
})



//hashing password
userSchema.pre('save', async function (next) {

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})
//generate token
userSchema.methods.generateAuthToken = async function () {
  try {
    let userToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: userToken });
    await this.save();
    return userToken;
  }
  catch (err) {
    console.log(err);
  }
}

//create collection
const User = mongoose.model('USER', userSchema);
module.exports = User;
