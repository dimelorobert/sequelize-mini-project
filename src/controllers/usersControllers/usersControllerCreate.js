// Desestructuramos variables globales configuradas en el archivo .env
require('dotenv').config();
const {
    USERS_UPLOADS_DIR,
    SECRET_KEY
} = process.env;

// Modulo que se encarga de asegurarnos las rutas de un archivo
const path = require('path');

// Esquema de validacion de los datos provenientes del lado del cliente
const {
    usersSchema
} = require('../../validations');

// Modelo estructura de las tablas de la base de datos
const {
    UsersModel
} = require('../../models');

const {
    helpers
} = require('../../helpers');

// Ubicación de la carpeta usuarios don de se alojaran los archivos
const userImagePath = path.join(__dirname, `../../${USERS_UPLOADS_DIR}`);


module.exports = {
    create: async (request, response, next) => {
        try {
            // Validamos los datos que nos envia el usuario
            await usersSchema.validateAsync(request.body);
            let {
                image,
                name,
                surname,
                genre,
                company,
                address,
                email,
                phone,
                mobile,
                website,
            } = request.body;

            // Manejamos los nulls o undefined  de los campos no requeridos y los procesamos para guardarlos en labase de datos formateados
            surname = helpers.firstWordCapitalize(helpers.handleEmptyField(surname).toLowerCase());
            genre = helpers.handleEmptyField(genre);
            company = helpers.handleEmptyField(company);
            address = helpers.firstWordCapitalize(helpers.handleEmptyField(address).toLowerCase());
            email = helpers.handleEmptyField(email).toLowerCase();
            phone = helpers.handleEmptyField(phone);
            website = helpers.handleEmptyField(website).toLowerCase();

            // Procesamos la imagen que recibimos del lado del cliente, 3 parametros los cuales son (locationPath, fileImage, sizeImage)
            let savedFileName;
            if (request.files && request.files.image) {
                try {
                    let uploadImageBody = request.files.image;
                    savedFileName = await helpers.processAndSavePhoto(userImagePath, uploadImageBody, 300, 300);
                } catch (error) {
                    return response.status(400).json({
                        status: 'error',
                        code: 400,
                        message: 'La imagen no ha sido procesada correctamente ,por favor intentalo de nuevo'
                    });
                }
            } else {
                savedFileName = image;
            }

            // Procesamos va para evitar espacios al principio y al final que el usuario nos pueda enviar
            const nameTrimmed = helpers.firstWordCapitalize(name.toLowerCase());
            const mobileTrimmed = mobile.trim();

            // Guardamos info en la base de datos
            const users = await UsersModel.create({
                image: savedFileName,
                name: nameTrimmed,
                surname: surname,
                genre: genre,
                company: company,
                address: address,
                email: email,
                phone: phone,
                mobile: mobileTrimmed,
                website: website
            })

            // Mandamos una respuesta en formato JSON
            response.send({
                status: 200,
                data: {
                    users: {
                        image: savedFileName,
                        name: nameTrimmed,
                        surname: surname,
                        genre: genre,
                        company: company,
                        address: address,
                        email: email,
                        phone: phone,
                        mobile: mobileTrimmed,
                        website: website
                    }
                },
                message: `Se ha añadido el usuario con el ID Nº : ${users.id}`
            });

        } catch (error) {
            // Si hay algún error lo mandamos al middleware de errores
            next(error);
        } finally {
            connectionDB.sync();
        }
    },
};