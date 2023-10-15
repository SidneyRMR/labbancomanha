const Sequelize = require('sequelize');
require('dotenv').config();

const NomeBD = process.env.API_BANCO_DADOS
const Usuario = process.env.API_USUARIO_BD
const Senha = process.env.API_SENHA_BD

const connection = new Sequelize(
    NomeBD, // nome do banco
    Usuario, // usuário de conexão
    Senha, // senha do banco
    {
        host: 'localhost', // url do servidor
        dialect: 'mysql', // tipo do banco
        timezone: '-03:00' // GMT -3 - Brasil
    }
);

module.exports = connection;