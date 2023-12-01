const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const Venda_produtoController = require('../controllers/venda_produtoController');

router.post('', checkAuth, Venda_produtoController.create);
router.put('/:id', checkAuth, Venda_produtoController.update);
router.get('', checkAuth, Venda_produtoController.getAll);
router.get('/:usuarioId',checkAuth, Venda_produtoController.getAllByUsuario)
router.get('/:id',checkAuth, Venda_produtoController.getOne);
router.delete('/:id',checkAuth, Venda_produtoController.delete);

module.exports = router;