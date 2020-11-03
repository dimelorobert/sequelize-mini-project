'use strict';
const {
    Sequelize
} = require('sequelize');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = process.env;


const connectionDB =
    new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        dialect: 'mysql',
        port: MYSQL_PORT,
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idel: 10000
        },
    });

module.exports = connectionDB;