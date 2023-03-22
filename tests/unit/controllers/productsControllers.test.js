const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/products.service');
const productController = require('../../../src/controllers/products.controller');

// MOCK (fazer posteriormente em arquivo separado)
const products = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Martelo' }];
const product = { id: 2, name: 'Martelo' };

const insertProduct = { name: 'Pedra filosofal' };
const createdProduct = { id: 3, name: 'Pedra filosofal' };
const insertInvalidProductName = { name: 'Pe' };
const insertNoProductName = {};

const jsonOkCreatedProduct = { type: null, message: createdProduct };
const jsonInvalidProductName = { type: "INVALID_VALUE", message: '"name" length must be at least 5 characters long' };
const jsonNoFieldProductName = { type: "REQUIRED_VALUE", message: '"name" is required' };

const jsonOkDeletedProduct = { type: null, message: "" };
const jsonInvalidProductId = { type: "NOT_FOUND", message: "Product not found" }

describe('Testando a camada controller de produtos', function () {

  describe('Testando as funções GET relacionadas a produtos', function () {

    it('Recuperando a lista dos produtos cadastrados', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves(products);

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('Recuperando um produto a partir de seu id', async function () {
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(product);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });

    it('Testando erro no retorno ao pesquisar produto através de um id inexistente no DB', async function () {
      const res = {};
      const req = { params: { id: 11 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves(undefined);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

  });

  describe('Testando as funções POST relacionadas a produtos', function () {

    it('Criando um novo produto e inserindo no DB', async function () {
      const res = {};
      const req = { body: insertProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'create')
        .resolves(jsonOkCreatedProduct);

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    });

    it('Testando erro ao tentar criar um novo produto com name ausente', async function () {
      const res = {};
      const req = { body: insertNoProductName };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'create')
        .resolves(jsonNoFieldProductName);

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('Testando erro ao tentar criar um novo produto com name com menos de 5 caracteres', async function () {
      const res = {};
      const req = { body: insertInvalidProductName };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'create')
        .resolves(jsonInvalidProductName);

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(422);
    });

  });

  describe('Testando as funções DELETE relacionadas a produtos', function () {

    it('Deletando um produto do DB através de seu id', async function () {
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      // Fiquei horas tentando descobrir o erro de end e vi na função que retorna end e não json
      res.end = sinon.stub().returns();
      sinon
        .stub(productService, 'remove')
        .resolves(jsonOkDeletedProduct);

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Testando erro ao tentar deletar um produto com um id inexistente no DB', async function () {
      const res = {};
      const req = { params: { id: 11 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'remove')
        .resolves(jsonInvalidProductId);

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});

/*
Base de consulta: mentoria turma 24
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/3013dcdc-9314-44e3-8df6-8f7c37e64bcd/recording/1a7a4afb-37e7-4a9c-9dc2-45e4716f5b68
*/
