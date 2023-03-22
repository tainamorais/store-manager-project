const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');

// MOCK (fazer posteriormente em arquivo separado)
const products = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Martelo' }];
const product = { id: 2, name: 'Martelo' };

const insertProduct = { name: 'Pedra filosofal' };
const createdProduct = { id: 3, name: 'Pedra filosofal' };

const insertInvalidProductName = { name: 'Pe' };
const insertNoProductName = {};

const invalidNameType = 'INVALID_VALUE';
const invalidNameMessage = '"name" length must be at least 5 characters long';

const noFieldNameType = 'REQUIRED_VALUE';
const noFieldNameMessage = '"name" is required';

describe('Testando a camada service de produtos', function () {

  describe('Testando as funções GET relacionads a produtos', function () {

    it('Recuperando a lista dos produtos cadastrados', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);
      const result = await productService.findAll();
      expect(result).to.deep.equal(products);
    });

    it('Recuperando um produto a partir de seu id', async function () {
      sinon.stub(productModel, 'findById').resolves(products[1]);
      const result = await productService.findById(2);
      expect(result).to.deep.equal(product);
    });
    
  });

  describe('Testando as funções POST relacionadas a produtos', function () {

    it('Criando um novo produto e inserindo no DB', async function () {
      sinon.stub(productModel, 'create').resolves(createdProduct);
      const result = await productService.create(insertProduct);
      const { type, message } = result;
      expect(type).to.equal(null);
      expect(message).to.equal(createdProduct);
    });

    it('Testando erro ao tentar criar um novo produto com name ausente', async function () {
      sinon.stub(productModel, 'create').resolves();

      const result = await productService.create(insertNoProductName);
      const { type, message } = result;

      expect(type).to.equal(noFieldNameType);
      expect(message).to.equal(noFieldNameMessage);
    });

    it('Testando erro ao tentar criar um novo produto com name com menos de 5 caracteres', async function () {
      sinon.stub(productModel, 'create').resolves();
      
      const result = await productService.create(insertInvalidProductName);
      const { type, message } = result;

      expect(type).to.equal(invalidNameType);
      expect(message).to.equal(invalidNameMessage);
    });

  });
  
  afterEach(function () {
    sinon.restore();
  });

});
