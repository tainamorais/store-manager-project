const { expect } = require("chai");
const sinon = require("sinon");

const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sales.model');

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

describe('Testando a camada model de vendas', function () {

  describe('Testando as funções GET relacionadas a vendas', function () {

    it('Recuperando a lista das vendas cadastradas', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await saleModel.findAll();
      expect(result).to.deep.equal(sales);
    });

    it('Recuperando uma venda a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[sale[0]]]);
      const result = await saleModel.findById(2);
      expect(result).to.deep.equal(sale);
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});
