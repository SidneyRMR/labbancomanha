const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsuarioController = require('../controllers/usuarioController');

router.post('', checkAuth, UsuarioController.create);
router.post('/login', UsuarioController.login);
router.get('/mu', UsuarioController.create2); // Rotina usada para criar usuario master
router.post('/trocarSenha', checkAuth, UsuarioController.trocarSenha);
router.put('/:id', checkAuth, UsuarioController.update);
router.get('', checkAuth, UsuarioController.getAll);

router.get('/:festaId',checkAuth, UsuarioController.getAllByFesta);
router.get('/:id',checkAuth, UsuarioController.getOne);
router.delete('/:id',checkAuth, UsuarioController.delete);

module.exports = router;