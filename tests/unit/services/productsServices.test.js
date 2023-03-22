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

const invalidIdType = 'NOT_FOUND';
const invalidIdMessage = 'Product not found';

// Objeto de retorno quando função remove é acionada na camada models
const ResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

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

  describe('Testando as funções DELETE relacionadas a produtos', function () {

    it('Deletando um produto do DB através de seu id', async function () {
      sinon.stub(productModel, 'remove').resolves(ResultSetHeader);
      const result = await productService.remove(2);
      const { type, message } = result;
      expect(type).to.be.equal(null);
      expect(message).to.be.equal('');
    });

    it('Testando erro ao tentar deletar um produto com um id inexistente no DB', async function () {
      // quando insere id inexistente, o console.log não retorna nada...
      sinon.stub(productModel, 'remove').resolves();
      const result = await productService.remove(11);
      const { type, message } = result;
      expect(type).to.be.equal(invalidIdType);
      expect(message).to.be.equal(invalidIdMessage);
    });

  });
  
  afterEach(function () {
    sinon.restore();
  });

});

/*
Base de consulta: mentoria turma 24
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/3013dcdc-9314-44e3-8df6-8f7c37e64bcd/recording/9a39973e-aa3f-4fdc-8cd6-f598cdf3da8a
*/
