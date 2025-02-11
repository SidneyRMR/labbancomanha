const Sequelize = require('sequelize');
const connection = require('../database/database');

const Produto = require('./produto');
const Venda = require('./venda');
const Usuario = require('./usuario');

const Venda_Produto = connection.define(
    'venda_produto',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        medida: {
            type: Sequelize.STRING,
            allowNull: false
        },
        preco: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        qtde_venda_produtos: {
            type: Sequelize.DECIMAL(10,3),
            allowNull: false
        },
        produtoId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
        vendaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
        usuarioId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        }
    }
);
// FK PRODUTO
Venda_Produto.belongsTo(Usuario, { foreignKey: 'usuarioId' });
// FK PRODUTO
Venda_Produto.belongsTo(Produto, { foreignKey: 'produtoId' });
// FK VENDA
Venda_Produto.belongsTo(Venda, { foreignKey: 'vendaId' });

// Venda_Produto.sync({force: true});

module.exports = Venda_Produto;