const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcacaoSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true},
    hour: { type: String, required: true},
    type: { type: String, required: true},
    address: {type: String, required: true},
    state: {type: String, required: true},
    admin: { type: Schema.Types.ObjectId, ref:'Admin' },
    equipa: { type: Schema.Types.ObjectId, ref: 'Equipa' },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente'}
},
{collection: 'Marcacao'}
)

module.exports = mongoose.model('Marcacao', MarcacaoSchema);

/* Teste */