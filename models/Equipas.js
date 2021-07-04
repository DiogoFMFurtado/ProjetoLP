const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipaSchema = new mongoose.Schema({

    trab1: { 
        type: String,
        required: true
    },
    trab2: { 
        type: String,
        required: true
    },
    trab3: { 
        type: String,
        required: true
    },
    teamName: {
        type: String,
        default: "Alpha"
    }
    
},
{collection: 'Equipas'})

module.exports = mongoose.model('Equipas', EquipaSchema);