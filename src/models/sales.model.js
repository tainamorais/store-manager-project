const connection = require('./connection');

const findAll = async () => {
  const SELECT = 'SELECT sp.sale_id saleId, s.date, sp.product_id productId, sp.quantity ';
  const FROM = 'FROM StoreManager.sales_products sp ';
  const INNER_JOIN = 'INNER JOIN StoreManager.sales s ON sp.sale_id = s.id';
  
  const [sales] = await connection.execute(
    // `SELECT sp.sale_id saleId, s.date, sp.product_id productId, sp.quantity FROM StoreManager.sales_products sp INNER JOIN StoreManager.sales s ON sp.sale_id = s.id`,
    `${SELECT}${FROM}${INNER_JOIN}`,
  );
  return sales;
};

const findById = async (id) => {
  // 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  const SELECT = 'SELECT s.date, sp.product_id productId, sp.quantity ';
  const FROM = 'FROM StoreManager.sales_products sp ';
  const INNER_JOIN = 'INNER JOIN StoreManager.sales s ON sp.sale_id = s.id';
  const [sale] = await connection.execute(
    `${SELECT}${FROM}${INNER_JOIN} WHERE sale_id = ?`, [id],
  );
  // Console para testar retorno da função para teste
  // console.log(sale);
  return sale;
};

const generateSale = async () => {
  const [createdSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return createdSale.insertId;
};

const create = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  // return saleCreated.insertId;

  // Está retornando array quando vai para service, não consegui transformar em objeto de forma alguma
  return ({
    id: saleId,
    itemsSold: [
      {
        productId,
        quantity,
      },
    ],
  });
};

const removeGeneratedSale = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );
  // console.log usado para ver retorno da função para realizar teste
  // console.log(result);
  return result;
};

const remove = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  );
  // console.log usado para ver retorno da função para realizar teste
  // console.log(result);
  return result;
};

module.exports = { findAll, findById, generateSale, create, removeGeneratedSale, remove };

// inserção
/*
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
*/

// retorno
/*
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
*/
