const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleService = require('../../../src/services/sales.service');
const saleController = require('../../../src/controllers/sales.controller');

// MOCK (fazer posteriormente em arquivo separado)
const sales = [
  {
    "saleId": 1,
    "date": "2023-03-22T18:23:00.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-03-22T18:23:00.000Z",
    "productId": 3,
    "quantity": 15
  }
];

// retorno de console ao testar retorno da função
const sale = [
  {
    "date": "2023-03-22T18:23:00.000Z",
    "productId": 3,
    "quantity": 15
  }
];

describe('Testando a camada controller de vendas', function () {

  describe('Testando as funções GET relacionadas a vendas', function () {

    it('Recuperando a lista das vendas cadastradas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves(sales);

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    it('Recuperando uma venda a partir de seu id', async function () {
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves(sale);

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    it('Testando erro no retorno ao pesquisar venda através de um id inexistente no DB', async function () {
      const res = {};
      const req = { params: { id: 11 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves([]);

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});