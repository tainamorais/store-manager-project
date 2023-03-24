const { expect } = require("chai");
const sinon = require("sinon");

const saleModel = require('../../../src/models/sales.model');
const saleService = require('../../../src/services/sales.service');
const productModel = require('../../../src/models/products.model');

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

const createdSale = {
  id: 5,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

const insertSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const insertSaleWithInvalidQuantity = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 0
  }
];

const insertSaleWithInvalidProductId = [
  {
    "productId": 1,
    "quantity": 3
  },
  {
    "productId": 11,
    "quantity": 1
  }
];

const product = { "id": 1, "name": "Martelo de Thor" };

const invalidIdType = 'NOT_FOUND';
const invalidIdMessage = 'Sale not found';
const invalidQuantityType = 'INVALID_VALUE';
const invalidQuantityMessage = '"quantity" must be greater than or equal to 1';
const invalidProductIdMessage = 'Product not found';

describe('Testando a camada service de vendas', function () {

  describe('Testando as funções GET relacionadas a vendas', function () {

    it('Recuperando a lista das vendas cadastradas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(sales);
      const result = await saleService.findAll();
      expect(result).to.deep.equal(sales);
    });

    it('Recuperando uma venda a partir de seu id', async function () {
      sinon.stub(saleModel, 'findById').resolves([[sale[0]]]);
      const result = await saleService.findById(2);
      expect(result).to.deep.equal([sale]);
    });

  });

  describe('Testando as funções DELETE relacionadas a vendas', function () {

    it('Deletando uma venda do DB através de seu id', async function () {
      sinon.stub(saleModel, 'findById').resolves({});
      sinon.stub(saleModel, 'removeGeneratedSale').resolves(undefined);
      sinon.stub(saleModel, 'remove').resolves(undefined);
      const result = await saleService.remove(2);
      const { type, message } = result;
      expect(type).to.be.equal(null);
      expect(message).to.be.equal('');
    });

    it('Testando erro ao tentar deletar uma venda com um id inexistente no DB', async function () {
      sinon.stub(saleModel, 'remove').resolves();
      const result = await saleService.remove(11);
      const { type, message } = result;
      expect(type).to.be.equal(invalidIdType);
      expect(message).to.be.equal(invalidIdMessage);
    });

  });

  describe('Testando as funções POST relacionadas a vendas', function () {

    it('Criando uma nova venda e inserindo no DB', async function () {
      sinon.stub(productModel, 'findById').resolves(product);
      sinon.stub(saleModel, 'generateSale').resolves(5);
      sinon.stub(saleModel, 'create').resolves(createdSale);
      
      const result = await saleService.create(insertSales);
      const { type, message } = result;

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdSale);
    });


    it('Testando erro ao tentar criar uma nova venda com quantidade igual a 0', async function () {
      sinon.stub(productModel, 'create').resolves();

      const result = await saleService.create(insertSaleWithInvalidQuantity);
      const { type, message } = result;

      expect(type).to.equal(invalidQuantityType);
      expect(message).to.equal(invalidQuantityMessage);
    });

    it('Testando erro ao tentar criar uma nova venda com um id de produto inexistente no DB ', async function () {
      sinon.stub(productModel, 'findById').resolves();

      const result = await saleService.create(insertSaleWithInvalidProductId);
      const { type, message } = result;

      expect(type).to.equal(invalidIdType);
      expect(message).to.equal(invalidProductIdMessage);
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});

/*
Esse vídeo ajudou demais:
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/3013dcdc-9314-44e3-8df6-8f7c37e64bcd/recording/9a39973e-aa3f-4fdc-8cd6-f598cdf3da8a
*/