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
            const {
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
            const nameTrimmed = helpers.firstWordCapitalize(name.trim().toLowerCase());
            const surnameTrimmed = helpers.firstWordCapitalize(surname.trim().toLowerCase());
            const addressTrimmed = helpers.firstWordCapitalize(address.trim().toLowerCase());

            const users = await UsersModel.create({
                image: savedFileName,
                name: nameTrimmed,
                surname: surnameTrimmed,
                genre: genre,
                company: company,
                address: addressTrimmed,
                email: email,
                phone: phone,
                mobile: mobile,
                website: website
            })
            response.send({
                status: 200,
                data: {
                    users
                },
                message: `Se ha añadido el usuario con el ID Nº : ${users.id}`
            });
            console.log(error.message);

        } catch (error) {
            next(error);
        } finally {
            //connectionDB.close();
        }
    },
};