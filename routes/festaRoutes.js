const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const FestaController = require('../controllers/festaController');

router.post('', FestaController.create);
router.put('/:id', checkAuth, FestaController.update);
router.get('',  FestaController.getAll);
router.get('/:id',checkAuth, FestaController.getOne);
router.delete('/:id',checkAuth, FestaController.delete);

module.exports = router;