const saleService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const sales = await saleService.findAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.findById(Number(id));

  // Apontamento de erro de teste, tentar refatorar depois
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  // console.log(sale);
  res.status(200).json(sale);
};

const create = async (req, res) => {
  const sales = req.body;
  
  // const newSales = await saleService.create(sales);
  const { type, message } = await saleService.create(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = { findAll, findById, create };
