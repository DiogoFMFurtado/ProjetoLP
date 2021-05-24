const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipaSchema = new mongoose.Schema({
    lider: { type: Schema.Types.ObjectId, ref: 'Trabalhador' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente'},
    aval: { type: String }
},
{collection: 'Equipa'})

module.exports = mongoose.model('Equipa', EquipaSchema);