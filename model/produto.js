const Sequelize = require('sequelize');
const connection = require('../database/database');

const Festa = require('./festa');

const Produto = connection.define(
    'produto',
    { 
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        preco: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        medida: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estoque: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ativo: {
            type: Sequelize.BOOLEAN, 
            allowNull: false
        },
        festaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        }
    }
);
//FK FESTA
Produto.belongsTo(Festa, { foreignKey: 'festaId' });

// Produto.sync({force: true});

module.exports = Produto;