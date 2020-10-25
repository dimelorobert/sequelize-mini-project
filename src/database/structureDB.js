// Crear conexión  a la base de datos
const {
    connectionDB
} = require('../config');

// Importa todos los modelos de las tablas para crear la base de datos
require('../models');

const structureDB = async () => {
    try {
        await connectionDB.sync();
        //console.log('Created the structure of database');
    } catch (error) {
        console.log('It was an error creating the structure of database', error);
    }
};
structureDB()

module.exports = structureDB;