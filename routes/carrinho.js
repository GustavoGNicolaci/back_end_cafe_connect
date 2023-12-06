const { verificarToken, verificarTokenEAdmin, verificarTokenEAutorizacao } = require('./verificarToken');

const Carrinho = require('../modelos/Carrinho');

const router = require('express').Router();

//CREATE
router.post('/', verificarToken, async (req, res) => {
    const novoCarrinho = new Carrinho(req.body)
    try {
        const carrinhoSalvo = await novoCarrinho.save();
        res.status(200).json(carrinhoSalvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put('/:id', verificarTokenEAutorizacao, async (req, res) => {
    try {
        const carrinhoAtualizado = await Carrinho.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(carrinhoAtualizado);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/:id', verificarTokenEAutorizacao, async (req, res) => {
    try {
        await Carrinho.findByIdAndDelete(req.params.id);
        res.status(200).json("Carrinho deletado com sucesso!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CARRINHO POR USUARIO
router.get('/find/:userId', verificarTokenEAutorizacao, async (req, res) => {
    try {
        const carrinho = await Carrinho.findOne({ userId: req.params.userId });
        res.status(200).json(carrinho);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL 

router.get('/', verificarTokenEAdmin, async (req, res) => {
    try {
        const carrinhos = await Carrinho.find();
        res.status(200).json(carrinhos);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;