const {
    connectionDB
} = require('../config');

module.exports = connectionDB.authenticate()
    .then(() => console.log('Sequelize test connection to Database is working'))
    .catch(error => console.log('It was an error in Sequelize test connection', error));