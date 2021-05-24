const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password2: { type: String, required: true },
    marcacoes: { type: Schema.Types.ObjectId, ref:'Marcacao' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin'},
    role: { type: String, required: true, default: 'Cliente'}
},
{collection: 'Cliente'}
)

module.exports = mongoose.model('Cliente', ClienteSchema);