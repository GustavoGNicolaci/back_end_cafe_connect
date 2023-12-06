const { verificarToken, verificarTokenEAdmin, verificarTokenEAutorizacao } = require('./verificarToken');

const Pedido = require('../modelos/Pedido');

const router = require('express').Router();

//CREATE
router.post('/', verificarTokenEAdmin, async (req, res) => {
    const novoPedido = new Pedido(req.body)
    try {
        const pedidoSalvo = await novoPedido.save();
        res.status(200).json(pedidoSalvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put('/:id', verificarToken, async (req, res) => {
    try {
        const pedidoAtualizado = await Pedido.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(pedidoAtualizado);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/:id', verificarTokenEAdmin, async (req, res) => {
    try {
        await Pedido.findByIdAndDelete(req.params.id);
        res.status(200).json("Pedido deletado com sucesso!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PEDIDOS POR USUARIO
router.get('/find/:userId', verificarTokenEAutorizacao, async (req, res) => {
    try {
        const carrinhos = await Pedido.find({ userId: req.params.userId });
        res.status(200).json(carrinhos);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL 
router.get('/', verificarTokenEAdmin, async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET RENDA MENSAIS
router.get('/renda', verificarTokenEAdmin, async (req, res) => {
    const date = new Date();
    const ultimoMes = new Date(date.setMonth(date.getMonth() - 1));
    const mesAnterior = new Date(new Date().setMonth(ultimoMes.getMonth() - 1));
    try {
        const renda = await Pedido.aggregate([
            { $match: { createdAt: { $gte: mesAnterior } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$quantia"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        res.status(200).json(renda);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;