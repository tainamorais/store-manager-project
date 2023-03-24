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

const insertSales = [{ "productId": 1, "quantity": 1 }, { "productId": 2, "quantity": 5 }];
const createdSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const insertNoQuantityField = [{ "productId": 1, "test": 3 }];

const jsonOkDeletedSale = { type: null, message: "" };
const jsonInvalidSaleId = { type: "NOT_FOUND", message: "Sale not found" };
const jsonOkCreatedSale = { type: null, message: createdSale };
const jsonNoQuantityField = { type: "REQUIRED_VALUE", message: '"quantity" is required' };


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


  describe('Testando as funções DELETE relacionadas a vendas', function () {

    it('Deletando uma venda do DB através de seu id', async function () {
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon
        .stub(saleService, 'remove')
        .resolves(jsonOkDeletedSale);

      await saleController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Testando erro ao tentar deletar uma venda com um id inexistente no DB', async function () {
      const res = {};
      const req = { params: { id: 11 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'remove')
        .resolves(jsonInvalidSaleId);

      await saleController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('Testando as funções POST relacionadas a vendas', function () {

    it('Criando uma nova venda e inserindo no DB', async function () {
      const res = {};
      const req = { body: insertSales };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'create')
        .resolves(jsonOkCreatedSale);

      await saleController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdSale);
    });

    it('Testando erro ao tentar criar uma nova venda com quantity ausente', async function () {
      const res = {};
      const req = { body: insertNoQuantityField };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'create')
        .resolves(jsonNoQuantityField);

      await saleController.create(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });
  });

  afterEach(function () {
    sinon.restore();
  });

});