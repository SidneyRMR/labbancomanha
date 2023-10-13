const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ProdutoController = require('../controllers/produtoController');

router.post('', checkAuth, ProdutoController.create);
router.put('/:id', checkAuth, ProdutoController.update);
router.get('', checkAuth, ProdutoController.getAll);
router.get('/:id',checkAuth, ProdutoController.getOne);
router.delete('/:id',checkAuth, ProdutoController.delete);

module.exports = router;