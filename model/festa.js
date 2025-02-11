const Sequelize = require('sequelize');
const connection = require('../database/database');

const Festa = connection.define(
    'festa',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ativa: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }
);

// Festa.sync({force: true});

module.exports = Festa;