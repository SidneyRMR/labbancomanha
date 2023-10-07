const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsuarioController = require('../controllers/usuarioController');

router.post('', UsuarioController.create);
router.post('/login', UsuarioController.login);
router.post('/mu', UsuarioController.create2);
router.post('/trocarSenha', checkAuth, UsuarioController.trocarSenha);
router.put('/:id', checkAuth, UsuarioController.update);
router.get('', UsuarioController.getAll);// por checkAuth depois novamente
router.get('/:id',checkAuth, UsuarioController.getOne);
router.delete('/:id',checkAuth, UsuarioController.delete);

module.exports = router;