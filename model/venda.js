const Sequelize = require('sequelize');
const connection = require('../database/database');

const Festa = require('./festa');
const Caixa = require('./caixa');
const Usuario = require('./usuario');

const Venda = connection.define(
    'venda',
    {
        debito: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        credito: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        pix: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        dinheiro: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }
    }
);
// FK CAIXA
Venda.belongsTo(Caixa);
// FK USUARIO
Venda.belongsTo(Usuario);

// Venda.sync({force: true});

module.exports = Venda;