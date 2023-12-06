const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, usuario) => {
            if(err){
                return res.status(403).json("Token não é válido!");
            }
            req.usuario = usuario;
            next();
        })
    } else {
        return res.status(401).json("Você não está autenticado!");
    }
};

const verificarTokenEAutorizacao = (req, res, next) => {
    verificarToken(req, res, () => {
        if(req.usuario.id === req.params.id || req.usuario.isAdmin){
            next();
        } else {
            return res.status(403).json("Você não é permitido para fazer isso!");
        }
    })
}

const verificarTokenEAdmin = (req, res, next) => {
    verificarToken(req, res, () => {
        if(req.usuario.isAdmin){
            next();
        } else {
            return res.status(403).json("Você não é permitido para fazer isso!");
        }
    })
}

module.exports = { verificarToken, verificarTokenEAutorizacao, verificarTokenEAdmin};
