const { Router } = require('express');

const saleController = require('../controllers/sales.controller');

const router = Router();

router.get('/', saleController.findAll);
router.get('/:id', saleController.findById);
router.post('/', saleController.create);

module.exports = router;
