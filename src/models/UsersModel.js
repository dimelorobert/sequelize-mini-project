'use strict';

// Desestructuramos Datatypes del modulo de SEQUELIZE para poder formar la tabla en la base de datos
const {
    DataTypes
} = require('sequelize');

// Importamos la conexión a la base de datos
const {connectionDB} = require('../config');


// Definimos la estructura de la tabla en la base de datos
const UsersModel = connectionDB.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
});
module.exports = UsersModel;