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
  return result;
};

module.exports = { findAll, findById, create, remove };
