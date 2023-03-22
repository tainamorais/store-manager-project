const { Router } = require('express');

const productController = require('../controllers/products.controller');

const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', productController.create);
router.delete('/:id', productController.remove);

module.exports = router;
