const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
    {
        cpf: {
            type: Number,
            required: true,
            unique: true
        },
        nome: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        senha: {
            type: String,
            required: true,
            unique: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        telefone: {
            type: Number,
            required: true,
            unique: false
        },
    },
    { timestamps: true}
);  

module.exports = mongoose.model("Usuario", UsuarioSchema);