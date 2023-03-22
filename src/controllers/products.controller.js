const productService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

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

// REQ. 03 Função create de caminho feliz, sem validações
// const create = async (req, res) => {
//   const { name } = req.body;
//   const newProduct = await productService.create({ name });
//   res.status(201).json(newProduct);
// };

// Tive que criar as validações e ajustar a função aqui para receber os erros
const create = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.create({ name });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.remove(Number(id));
  
  // Captura código do erro e retorna a mensagem cadastrada em service
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  
  // não retorna nada de mensagem - usar end para finalizar
  return res.status(204).end();
};

module.exports = { findAll, findById, create, remove };
