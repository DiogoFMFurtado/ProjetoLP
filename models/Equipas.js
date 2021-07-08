const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipaSchema = new mongoose.Schema({

    trab1: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trab'
    },
    trab2: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trab'
    },
    trab3: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trab'
    },
    teamName: {
        type: String,
        required: true
    },
    marcsEquipa: [{
        type: Schema.Types.ObjectId,
        ref: 'Marcacao'
    }]
},
{collection: 'Equipas'})

module.exports = mongoose.model('Equipas', EquipaSchema);