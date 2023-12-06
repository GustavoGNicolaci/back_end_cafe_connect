const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema(
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
        ],
        quantia: {
            type: Number,
            required: true,
            unique: false
        },
        endereco: {
            type: Object,
            required: true,
            unique: false
        },
        status: {
            type: String,
            default: "Pendente",
            required: true,
            unique: false
        },
    },
    { timestamps: true}
);  

module.exports = mongoose.model("Pedido", PedidoSchema);