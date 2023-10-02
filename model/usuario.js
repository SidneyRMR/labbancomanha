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
        }
    }
);
// FK FESTA
Usuario.belongsTo(Festa);

// Usuario.sync({force: true});

module.exports = Usuario;