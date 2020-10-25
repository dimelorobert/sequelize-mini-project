'use strict';
const {
    Sequelize
} = require('sequelize');
require('dotenv').config();
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = process.env;

let connectionDB;

module.exports = connectionDB = 
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
        })
    