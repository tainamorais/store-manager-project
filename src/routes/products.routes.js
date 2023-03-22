const { Router } = require('express');

const productController = require('../controllers/products.controller');

const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', productController.create);
router.delete('/:id', productController.remove);
router.put('/:id', productController.update);

module.exports = router;
