const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const VendaController = require('../controllers/vendaController');

router.post('', VendaController.create);
router.put('/:id', checkAuth, VendaController.update);
router.get('', checkAuth, VendaController.getAll);
router.get('/:id',checkAuth, VendaController.getOne);
router.delete('/:id',checkAuth, VendaController.delete);

module.exports = router;