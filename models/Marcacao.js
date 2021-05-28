const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcacaoSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true},
    hour: { type: String, required: true},
    type: { type: String, required: true},
    address: {type: String, required: true},
    state: {type: String, default: 'Pendente'},
    admin: { type: Schema.Types.ObjectId, ref:'Admin' },
    equipa: { type: Schema.Types.ObjectId, ref: 'Equipa' },
    cliente: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    }
},
{collection: 'Marcacao'}
)

module.exports = mongoose.model('Marcacoes', MarcacaoSchema);

/* Teste */
/* Teste2 */