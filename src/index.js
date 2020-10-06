'use strict';

//////////////// Modulos a usar /////////////////////////
require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const router = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());

/////////////////// MIDDLEWARES //////////////////////////
// Body Parser transforma el json que recibe en estructura de peticion automaticamente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// MIDDLEWARE CONTROLADOR DE ERRORES
//Errores previos a Middleware llegan aqui
app.use((error, request, response, next) => {
    console.log(error);
    response.status(error.httpCode || 500).send({ message: error.message });
});

// Middleware not found
app.use((request, response) => {
    response.status(404).send({ message: '❌ Page not found!😢' });
});

//////////////// SERVER //////////////////////
// Configuracion puertos server
const { PORT } = process.env;
app.set('port', PORT || 3001);
const port = app.get('port');
app.listen(port, () => {
    console.log(`✔️ 🚀 >>>> Server working on PORT ${port}  <<<< 🚀 ✔️`);
    sequelize.authenticate().then(() => {
        console.log('Connected to Database');
    }).catch(error => {
        console.log('It was an error connecting to database', error);
    })
});