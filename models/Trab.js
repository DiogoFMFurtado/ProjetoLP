const { SchemaType } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//------------ User Schema ------------//
const TrabSchema = new mongoose.Schema({
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
    default: 'Trabalhador'
  },
  resetLink: {
    type: String,
    default: ''
  },
  pequipa: {
    type: String,
    default: 'Não'
  },
  equipa: {
    type: Schema.Types.ObjectId,
    ref: 'Equipas'
  },
  marcTrab: [{
    type: Schema.Types.ObjectId,
    ref: 'Marcacao'
  }],
  note: {
    type: String,
    default: "Não tem nota"
  },
  disponibilidade: {
    type: String,
    default: "Sim"
  },
  feedbacksT: [{
    type: Schema.Types.ObjectId,
    ref: 'Feedback'
  }]
}, { timestamps: true });

const Trab = mongoose.model('Trab', TrabSchema);

module.exports = Trab;