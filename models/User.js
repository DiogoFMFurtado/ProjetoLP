const mongoose = require('mongoose');

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
  name: {
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
  verified: {
    type: Boolean,
    default: false
  },
  role: { type: String, 
    required: true, 
    default: 'Cliente'
  },
  resetLink: {
    type: String,
    default: ''
  },
  admin: {
    type: String,
    default: 'Sem Manager'
  },
  marcacaoCliente: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marcacao'
  }],
  equipa: {
    type: String,
    default: 'Não'
  }
  
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;