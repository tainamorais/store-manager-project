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

const ResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const createdSale = {
  id: 5,
  itemsSold: [
    {
      productId: 1,
      quantity: 7,
    },
  ],
};

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

  describe('Testando as funções DELETE relacionadas a vendas', function () {

    it('Deletando uma venda do DB através de seu id (funcao remove)', async function () {
      sinon.stub(connection, 'execute').resolves([ResultSetHeader]);
      const result = await saleModel.remove(2);
      expect(result.affectedRows).to.be.equal(1);
    });

    it('Deletando uma venda do DB através de seu id (funcao removeGeneratedSale)', async function () {
      sinon.stub(connection, 'execute').resolves([ResultSetHeader]);
      const result = await saleModel.removeGeneratedSale(2);
      expect(result.affectedRows).to.be.equal(1);
    });

  });

  describe('Testando as funções POST relacionadas a vendas', function () {

    it('Criando uma nova venda e inserindo no DB (funcao generateSale)', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await saleModel.generateSale();
      expect(result).to.be.equal(4);
    });

    it('Criando uma nova venda e inserindo no DB (funcao create)', async function () {
      sinon.stub(connection, 'execute').resolves(5);
      const result = await saleModel.create(5, 1, 7);
      expect(result).to.deep.equal(createdSale);
    });
  });

  afterEach(function () {
    sinon.restore();
  });

});
