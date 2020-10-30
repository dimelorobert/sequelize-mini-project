'use strict';

// Desestructuramos Datatypes del modulo de SEQUELIZE para poder formar la tabla en la base de datos
const {
    Sequelize,
    DataTypes
} = require('sequelize');

// Importamos la conexión a la base de datos
const {
    connectionDB
} = require('../config');

// importamos moduloque genera id alfanumerico aleatorios
const shortid = require('shortid');

// Definimos la estructura de la tabla en la base de datos
const UsersModel = connectionDB.define('users', {
    id: {
        type: DataTypes.STRING,
        defaultValue: shortid.generate,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: true,
        defaultValue: 'Otro'

    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },

    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: true
    },
});




module.exports = UsersModel;