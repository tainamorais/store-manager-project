const productService = require('../services/products.service');

const findAll = async (_req, res) => {
  const products = await productService.findAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.findById(Number(id));

    // Apontamento de erro de teste, tentar refatorar depois
  if (product === undefined) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = { findAll, findById };
