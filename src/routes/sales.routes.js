const { Router } = require('express');

const saleController = require('../controllers/sales.controller');

const router = Router();

router.get('/', saleController.findAll);
router.get('/:id', saleController.findById);
router.post('/', saleController.create);
router.delete('/:id', saleController.remove);
router.put('/:id', saleController.update);

module.exports = router;
