const express = require('express');
const cors = require("cors")
const connection = require('./database/database');

// Models
// const Caixa = require('./model/caixa');
// const Festa = require('./model/festa');
// const Produto = require('./model/produto');
// const Usuario = require('./model/usuario');
// const Venda_produto = require('./model/venda_produto');
// const Venda = require('./model/venda');

// Routes import
const caixaRoutes = require('./routes/caixaRoutes');
const festaRoutes = require('./routes/festaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const venda_produtoRoutes = require('./routes/venda_produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const Usuario = require('./model/usuario');

const app = express();

// Environment Setup
// Forms Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch((error) => {
    console.log(error);
  });

// Access from other origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
app.use('/api/caixa', caixaRoutes);
app.use('/api/festa', festaRoutes);
app.use('/api/produto', produtoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/venda_produto', venda_produtoRoutes);
app.use('/api/venda', vendaRoutes);
module.exports = app;
