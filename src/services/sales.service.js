const saleModel = require('../models/sales.model');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return sales;
};

const findById = async (id) => {
  const sale = await saleModel.findById(id);
  // Console para testar retorno da função para teste
  // console.log(sale);
  return sale;
};

// Função incompleta: trabalhando no requisito 06 (assistindo vídeos)
// const create = async (sales) => {
//   // const error = validator.createProductValidator({ name });

//   // if (error.type) return error;

//   const promisesSales = sales.map((sale) => saleModel.create(sale.productId, sale.quantity));

//   const result = Promise.all(promisesSales);

//   return result;
//   // return ({ type: null, message: newProduct });
// };

module.exports = { findAll, findById };
