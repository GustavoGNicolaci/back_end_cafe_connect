const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const usuarioRoute = require('./routes/usuario');
const autenticacaoRoute = require('./routes/autenticacao');
const produtoRoute = require('./routes/produtos');
const carrinhoRoute = require('./routes/carrinho');
const pedidoRoute = require('./routes/pedido');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
dotenv.config();

const { MONGO_URL, PORT } = process.env;

mongoose.connect(
    MONGO_URL
).then(() => console.log('Conectado ao DB')).catch((err) => console.log('Erro ao conectar ao MongoDB: ' + err));

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoute);
app.use("/api/autenticacao", autenticacaoRoute);
app.use("/api/produtos", produtoRoute);
app.use("/api/carrinhos", carrinhoRoute);
app.use("/api/pedidos", pedidoRoute);
app.use("/api/pagamento", stripeRoute);

app.listen(PORT, () => {
  console.log('Porta 5000');
});