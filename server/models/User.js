const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
    type: String,
    required: true,
    default:null
  },
lastname: {
    type: String,
    required: true,
    default:null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default:null,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  solvedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]

});

module.exports = mongoose.model('User', userSchema);