const Sequelize = require('sequelize');
const connection = require('../database/database');

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
        },
        usuarioId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
        caixaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        }
    }
);
// FK CAIXA
Venda.belongsTo(Caixa, { foreignKey: 'caixaId' });
// FK USUARIO
Venda.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Venda.sync({force: true});

module.exports = Venda;