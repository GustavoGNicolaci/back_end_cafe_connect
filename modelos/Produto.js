const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true
        },
        descricao: {
            type: String,
            required: true,
            unique: false
        },
        img: {
            type: String,
            required: true,
            unique: false
        },
        categoria: {
            Array
        },
        preco: {
            type: Number,
            required: true,
            unique: false
        },
    },
    { timestamps: true}
);  

module.exports = mongoose.model("Produto", ProdutoSchema);