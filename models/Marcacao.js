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
    // admin: { type: Schema.Types.ObjectId, ref:'Admin' },
    admin: {
        type: String,
        default: 'Não'
    },
    // equipa: { type: Schema.Types.ObjectId, ref: 'Equipa' },
    equipa: {
        type: String,
        default: 'Não'
    },
    cliente: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    aval_admin: {
        type: String,
        default: "Sem Avaliação pelo Manager"
    }

},
{collection: 'Marcacao'}
)

module.exports = mongoose.model('Marcacao', MarcacaoSchema);

/* Teste */
/* Teste2 */