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

describe('Testando a camada controller de produtos', function () {

  describe('Testando as funções GET relacionada a produtos', function () {

    it('Recuperando a lista dos produtos cadastrados', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findAll")
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
        .stub(productService, "findById")
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
        .stub(productService, "findById")
        .resolves(undefined);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

  });

  afterEach(function () {
    sinon.restore();
  });

});
