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

const remove = async (id) => {
  // Necessário consultar no DB a existência do id
  const isProductIdValid = await productModel.findById(id);

  // Caso não exista:
  if (!isProductIdValid) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  await productModel.remove(id);

  return ({ type: null, message: '' });
};

const update = async (id, { name }) => {
  // Necessário consultar no DB a existência do id
  const isProductIdValid = await productModel.findById(id);

  // Caso não exista:
  if (!isProductIdValid) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  // Validador de campos de name
  const error = validator.createProductValidator({ name });
  if (error.type) return error;

  // retirei de const, não farei nada com a informação que retorna de model
  await productModel.update(id, { name });
  // Tive que consultar de novo, pois não estava conseguindo o retorno do objeto desejado
  const searchUpdatedProduct = await productModel.findById(id);
  // console.log(searchUpdatedProduct);

  return ({ type: null, message: searchUpdatedProduct });
};

module.exports = { findAll, findById, create, remove, update };
