const saleService = require('../services/sales.service');

const findAll = async (_req, res) => {
  const sales = await saleService.findAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.findById(Number(id));

  // Apontamento de erro de teste, tentar refatorar depois
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

// Função incompleta: trabalhando no requisito 06 (assistindo vídeos)
// const create = async (req, res) => {
//   const { sales } = req.body;

//   // const { type, message } = await saleService.create({ name });

//   // if (type) return res.status(errorMap.mapError(type)).json({ message });

//   const result = await saleService.create(sales);

//   return res.status(201).json(result);
// };

module.exports = { findAll, findById };
