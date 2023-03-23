const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );

  return product;
};

const create = async ({ name }) => {
  const [productCreated] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );

  return { id: productCreated.insertId, name };
};

const remove = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  // console.log usado para ver retorno da função para realizar teste
  // console.log(result);
  return result;
};

const update = async (id, { name }) => {
  const [product] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  // console.log usado para ver retorno da função para realizar teste
  // console.log(product);
  return ({ id, ...product });
};

module.exports = { findAll, findById, create, remove, update };

/*
Esse é o retorno da função update em model - usar em testes
ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}
*/
