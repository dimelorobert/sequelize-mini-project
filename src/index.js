'use strict';

//////////////// Modulos a usar /////////////////////////
require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

// Crear conexión  a la base de datos y crea las tablas 
require('./database');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());

/////////////////// MIDDLEWARES //////////////////////////
// Body Parser transforma el json que recibe en estructura de peticion automaticamente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Carpeta donde se alojaran todos los archivos publicos de la api no en si misma es decir con la ruta /public/uploads... NO
si no,  que se accedera desde la carpeta que contiene es decir /uploads/users...*/
app.use(express.static(path.join(__dirname, 'public')));

// Modulo que permite subir archivos a la api
app.use(fileUpload());

// Modulo controlador de las rutas de la api
app.use('/', router);



// MIDDLEWARE CONTROLADOR DE ERRORES
//Errores previos a Middleware llegan aqui
app.use((error, request, response, next) => {
    console.log(error);
    response.status(error.httpCode || 500).send({
        message: error.message
    });
});

// Middleware not found
app.use((request, response) => {
    response.status(404).send({
        message: '❌ Page not found!😢'
    });
});

//////////////// SERVER //////////////////////
// Configuracion puertos server
app.set('port', PORT || 3002);
const port = app.get('port');
app.listen(port, () => {
    console.log(`✔️ 🚀 >>>> Server working on PORT ${port}  <<<< 🚀 ✔️`);
    // //force:true , hace Drop tables y force: false , las crea
    // sequelize.sync({ force: false }).then(() => {
    //     console.log('Connected to Database');
    // }).catch(error => {
    //     console.log('It was an error connecting to database', error);
    // })
});