const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CaixaController = require('../controllers/caixaController');

router.post('', CaixaController.create);
router.put('/:id', checkAuth, CaixaController.update);
router.get('', checkAuth, CaixaController.getAll);
router.get('/:id',checkAuth, CaixaController.getOne);
router.delete('/:id',checkAuth, CaixaController.delete);

module.exports = router;