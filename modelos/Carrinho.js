const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: false
        },
        produtos: [
            {
                idProduto: {
                    type: String
                },
                quantidade: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    { timestamps: true}
);  

module.exports = mongoose.model("Carrinho", CarrinhoSchema);