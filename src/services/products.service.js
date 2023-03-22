const productModel = require('../models/products.model');
const validator = require('../middlewares/validator');

const findAll = async () => {
  const products = await productModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

// REQ. 03 Função create de caminho feliz, sem validações
// const create = async ({ name }) => {
//   // validações de regras de negócio
//   const newProduct = await productModel.create({ name });
//   return newProduct;
// };

// Tive que criar as validações e ajustar a função para receber os erros
const create = async ({ name }) => {
  const error = validator.createProductValidator({ name });

  if (error.type) return error;

  const newProduct = await productModel.create({ name });

  return ({ type: null, message: newProduct });
};

module.exports = { findAll, findById, create };
