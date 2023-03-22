const express = require('express');
const productRoutes = require('./routes/products.routes');
const saleRoutes = require('./routes/sales.routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

/*
Mentoria destravando requisito 06
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/f87fd08a-6753-44b4-a654-3dbaaca898f4/recording/52662149-bc68-4060-9daa-a3115dc0ac33
*/
