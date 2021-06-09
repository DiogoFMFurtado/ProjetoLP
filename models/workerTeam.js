const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  trab1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trab'
  },
  trab2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trab'
  },
  trab3: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Trab'
  },
  trab4: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Trab'
  },
  trab5: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Author'
  },
})



module.exports = mongoose.model('Team', teamSchema)