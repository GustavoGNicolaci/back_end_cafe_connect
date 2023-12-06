const { verificarToken, verificarTokenEAdmin, verificarTokenEAutorizacao } = require('./verificarToken');

const Produto = require('../modelos/Produto');

const router = require('express').Router();

//CREATE
router.post('/', verificarTokenEAdmin, async (req, res) => {
    const novoProduto = new Produto(req.body)
    try {
        const produtoSalvo = await novoProduto.save();
        res.status(200).json(produtoSalvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put('/:id', verificarTokenEAdmin, async (req, res) => {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(produtoAtualizado);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/:id', verificarTokenEAdmin, async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.status(200).json("Produto deletado com sucesso!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUTO
router.get('/find/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUTOS
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategoria = req.query.categoria;
    try {
        let produtos;
        if(qNew){
            produtos = await Produto.find().sort({ createdAt: -1}).limit(5);
        } else if(qCategoria){
            produtos = await Produto.find({
                categorias: {
                    $in: [qCategoria],
                },
            });
        } else {
            produtos = await Produto.find();
        }

        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;