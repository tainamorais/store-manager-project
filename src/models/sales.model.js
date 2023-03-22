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

  return sale;
};

// Trabalhando no requisito 06 (assistindo vídeos)
// const create = async (productId, quantity) => {
//   const [saleCreated] = await connection.execute(
//     'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUES (?, ?)',
//     [productId, quantity],
//   );

//   return {
//     id: saleCreated.insertId,
//     itemsSold: [
//       {
//         productId,
//         quantity,
//       },
//     ],
//   };
// };

module.exports = { findAll, findById };

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
