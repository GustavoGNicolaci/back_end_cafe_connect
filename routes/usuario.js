const { verificarToken, verificarTokenEAdmin, verificarTokenEAutorizacao } = require('./verificarToken');

const Usuario = require('../modelos/Usuario');

const router = require('express').Router();


//UPDATE
router.put('/:id', verificarTokenEAutorizacao, async (req, res) => {
    if(req.body.senha){
        req.body.senha = CryptoJS.AES.encrypt(req.body.senha, process.env.SENHA_SEC).toString();
    }
    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(usuarioAtualizado);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete('/:id', verificarTokenEAutorizacao, async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json("Usuário deletado com sucesso!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USUARIO
router.get('/find/:id', verificarTokenEAdmin, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        const { senha, ...info } = usuario._doc;

        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USUARIO
router.get('/', verificarTokenEAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const usuarios = query ? await Usuario.find().sort({_id:-1}).limit(5) : await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USUARIO STATS
router.get('/stats', verificarTokenEAdmin, async (req, res) => {
    const hoje = new Date();
    const ultimoAno = hoje.setFullYear(hoje.setFullYear() - 1);

    try {
        const dados = await Usuario.aggregate([
            { $match: { createdAt: { $gte: new Date(ultimoAno) } } },
            {
                $project: {
                    mes: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$mes",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(dados);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;