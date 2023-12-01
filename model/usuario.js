const Sequelize = require('sequelize');
const connection = require('../database/database');

const Festa = require('./festa');

const Usuario = connection.define(
    'usuario',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        administrador: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        festaId: {
            type: Sequelize.INTEGER, 
            allowNull: false
        },
    }
);
// FK FESTA
Usuario.belongsTo(Festa, { foreignKey: 'festaId' } );

// Usuario.sync({force: true});

module.exports = Usuario;