const { expect } = require("chai");
const sinon = require("sinon");

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');

// MOCK (fazer posteriormente em arquivo separado)
const products = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Martelo' }];
const product = { id: 2, name: 'Martelo' };

const insertId = [{ insertId: 3 }];
const insertProduct = { name: 'Pedra filosofal' };
const createdProduct = { id: 3, name: 'Pedra filosofal' };

describe('Testando a camada model de produtos', function () {

  describe('Testando as funções GET relacionadas a produtos', function () {

    it('Recuperando a lista dos produtos cadastrados', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productModel.findAll();
      expect(result).to.deep.equal(products);
    });

    it('Recuperando um produto a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[products[1]]]);
      const result = await productModel.findById(2);
      expect(result).to.deep.equal(product);
    });
    
  });

  describe('Testando as funções POST relacionadas a produtos', function () {

    it('Criando um novo produto e inserindo no DB', async function () {
      sinon.stub(connection, 'execute').resolves(insertId);
      const result = await productModel.create(insertProduct);
      expect(result).to.deep.equal(createdProduct);
    });

  });
  
  afterEach(function () {
    sinon.restore();
  });

});
