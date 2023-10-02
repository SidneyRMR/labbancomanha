const jwt = require('jsonwebtoken');

const utilidades = require('../utilidades/utilidades');

module.exports = (req, res, next) => {
    const JWT_KEY = utilidades.JWT_KEY;
    try
    {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, JWT_KEY);
        req.userData = { login: decodedToken.login };
        next();
    }
    catch(error)
    {
        res.status(401).json({ message: 'Não autenticado!' });
    }

}