const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FeedbackSchema = new mongoose.Schema({
  name: {type: String, required: true},
  feedback: {type: String, required: true},
  cliente: {type: Schema.Types.ObjectId, ref: 'User'},
  trab: {type: Schema.Types.ObjectId, ref: 'Trab'}
}, { colection: 'Feedback' });

module.exports = mongoose.model('Feedback', FeedbackSchema);