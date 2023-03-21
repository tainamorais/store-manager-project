const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productModel = require('../../../src/models/products.model');

// MOCK (fazer posteriormente em arquivo separado)
const products = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Martelo' }];
const product = { id: 2, name: 'Martelo' };

describe('Testando a camada model de produtos', function () {

  describe('Testando as funções GET relacionada a produtos', function () {

    it('Recuperando a lista dos produtos cadastrados', async function () {
      sinon.stub(connection, "execute").resolves([products]);
      const result = await productModel.findAll();
      expect(result).to.deep.equal(products);
    });

    it('Recuperando um produto a partir de seu id', async function () {
      sinon.stub(connection, "execute").resolves([[products[1]]]);
      const result = await productModel.findById(2);
      expect(result).to.deep.equal(product);
    });
    
  });
  
  afterEach(function () {
    sinon.restore();
  });

});
