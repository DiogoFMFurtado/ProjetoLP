const { Schema } = require('mongoose');
const mongoose = require('mongoose');

//------------ User Schema ------------//
const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
    default: 'Adminstrador'
  },
  resetLink: {
    type: String,
    default: ''
  },
  gender: { type: String,  
  },
  distrito: { type: String,  
  },
  concelho: { type: String,  
  },
  descricao: { type: String, 
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;