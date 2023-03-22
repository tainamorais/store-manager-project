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

// Objeto de retorno quando função remove é acionada na camada models
const ResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

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

  describe('Testando as funções DELETE relacionadas a produtos', function () {

    it('Deletando um produto do DB através de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([ResultSetHeader]);
      const result = await productModel.remove(2);
      expect(result.affectedRows).to.be.equal(1);
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});

/*
Base de consulta: mentoria turma 24
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/3013dcdc-9314-44e3-8df6-8f7c37e64bcd/recording/0ab018c3-e9bf-4d4c-8f4c-a264c71cf1e4
*/
