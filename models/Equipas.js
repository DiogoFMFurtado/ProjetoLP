const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipaSchema = new mongoose.Schema({
    trab1: { type: Schema.Types.ObjectId, ref: 'Trab' },
    trab2: { type: Schema.Types.ObjectId, ref: 'Trab' },
    trab3: { type: Schema.Types.ObjectId, ref: 'Trab' },
},
{collection: 'Equipas'})

module.exports = mongoose.model('Equipas', EquipaSchema);