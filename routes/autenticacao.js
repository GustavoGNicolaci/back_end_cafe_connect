const router = require('express').Router();
const Usuario = require('../modelos/Usuario');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTRAR
router.post('/registrar', async (req, res) => {
    const novoUsuario = new Usuario({
        cpf: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email,
        senha: CryptoJS.AES.encrypt(req.body.senha, process.env.SENHA_SEC).toString(),
        telefone: req.body.telefone,
    });

    try {
        const usuarioSalvo = await novoUsuario.save()
        res.status(201).json(usuarioSalvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        !usuario && res.status(401).json("Senha ou email incorretos!");

        const pegarSenha = CryptoJS.AES.decrypt(usuario.senha, process.env.SENHA_SEC);
        const senhaOriginal = pegarSenha.toString(CryptoJS.enc.Utf8);

        senhaOriginal !== req.body.senha && res.status(401).json("Senha ou email incorretos!");

        const accessToken = jwt.sign({
            id: usuario._id,
            isAdmin: usuario.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "3d" });

        const { senha, ...info } = usuario._doc;

        res.status(200).json({...info, accessToken});

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;