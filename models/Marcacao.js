const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcacaoSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true},
    hour: { type: String, required: true},
    address: {type: String, required: true},
    state: {type: String, default: 'Pendente'},
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
    },
    descricao: {
        type: String,
        default: "Sem Descrição"
    },
    aval_client: {
        type: String,
        default: "Sem Avaliação do Cliente"
    },
    avaliado: {
        type: Boolean,
        default: false
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Equipas'
    },
    avaliado_admin: {
        type: String,
        default: 'Não'
    },

},
{collection: 'Marcacao'}
)

module.exports = mongoose.model('Marcacao', MarcacaoSchema);

/* Teste */
/* Teste2 */