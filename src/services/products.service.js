const productModel = require('../models/products.model');

const findAll = async () => {
  const products = await productModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  return product;
};

module.exports = { findAll, findById };
