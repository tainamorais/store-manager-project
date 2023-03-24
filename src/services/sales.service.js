const saleModel = require('../models/sales.model');
const validator = require('../middlewares/validator');
const productModel = require('../models/products.model');

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

/*
Função do requisito 06 feita com base no vídeo da Trybe de mentoria de ajuda no req 06:
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/f87fd08a-6753-44b4-a654-3dbaaca898f4/recording/52662149-bc68-4060-9daa-a3115dc0ac33
*/
const create = async (sales) => {
  const error = validator.createSaleValidator(sales);
  if (error.type) return error;

  const salesData = sales.map((sale) => productModel.findById(sale.productId));
  const resultSalesData = await Promise.all(salesData);
  // console.log(resultSalesData);

  const checkSaleId = resultSalesData.some((value) => typeof value === 'undefined');
  // console.log(checkSaleId);

  if (checkSaleId) return ({ type: 'NOT_FOUND', message: 'Product not found' });

  const newSaleId = await saleModel.generateSale();
  // console.log(newSaleId);

  const newSalesPromises = sales
    .map(({ productId, quantity }) => saleModel.create(newSaleId, productId, quantity));

  await Promise.all(newSalesPromises);

  // Tentando transformar array de objetos, em objeto de objetos...
  // const obj = { ...newSalesResolvedPromises }; - fica objeto com chave extra
  const objectSale = sales.map((sale) => ({ productId: sale.productId, quantity: sale.quantity }));

  return ({ type: null, message: { id: newSaleId, itemsSold: objectSale } });
  // return ({ type: null, message: { id: newSaleId, itemsSold: newSalesResolvedPromises } });
};

const remove = async (id) => {
  // Necessário consultar no DB a existência do id
  const isSaleIdValid = await saleModel.findById(id);
  
  // Essa função retorna array. Se não existe, é um array vazio, portanto, não pode ser undefined.
  // console.log(isSaleIdValid);

  // Caso não exista:
  if (isSaleIdValid.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  await saleModel.remove(id);
  await saleModel.removeGeneratedSale(id);

  return ({ type: null, message: '' });
};

// Quase mesma estrutura do create, retirando e alterando apenas alguns itens
const update = async (saleId, sales) => {
  const error = validator.createSaleValidator(sales);
  if (error.type) return error;

  // 1º passo: Achar a venda no DB. Caso inexistente, retornar erro. Funcao ja criada em delete.
  const isSaleIdValid = await saleModel.findById(saleId);
  if (isSaleIdValid.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  // Localizar dados dos produtos no DB, assim como feito em create sale
  // Se existir algum id de produto inexistente no DB, retorna undefined
  const salesData = sales.map((sale) => productModel.findById(sale.productId));
  const resultSalesData = await Promise.all(salesData);
  // console.log(salesData);

  // Verificar se nos produtos retornados na funcao anterior tem algum undefined
  // Se tiver algum undefined, retorna erro de not found
  const checkSaleId = resultSalesData.some((value) => typeof value === 'undefined');
  if (checkSaleId) return ({ type: 'NOT_FOUND', message: 'Product not found' });

  // Depois de tudo ok em validacoes de erros, map em cada produto e chamar funcao model de update
  const newSalesPromises = sales
    .map(({ productId, quantity }) => saleModel.update(saleId, productId, quantity));
  await Promise.all(newSalesPromises);

  // Assim como em create, fazer a estrutura de retorno dos produtos atualizados, conforme readme
  const objectSale = sales.map((sale) => ({ productId: sale.productId, quantity: sale.quantity }));

  return ({ type: null, message: { saleId, itemsUpdated: objectSale } });
};

module.exports = { findAll, findById, create, remove, update };
