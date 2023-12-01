const Sequelize = require('sequelize');
const connection = require('../database/database');

const Caixa = require('./caixa');
const Usuario = require('./usuario');
const Festa = require('./festa');

const Venda = connection.define(
    'venda',
    {
        dinheiro: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
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
        caixaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
        usuarioId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
        festaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        }
    }
);
// FK CAIXA
Venda.belongsTo(Caixa, { foreignKey: 'caixaId' });
// FK USUARIO
Venda.belongsTo(Usuario, { foreignKey: 'usuarioId' });
// FK USUARIO
Venda.belongsTo(Festa, { foreignKey: 'festaId' });

// Venda.sync({force: true});

module.exports = Venda;