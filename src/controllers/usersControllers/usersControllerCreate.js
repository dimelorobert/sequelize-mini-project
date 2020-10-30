// Desestructuramos variables globales configuradas en el archivo .env
require('dotenv').config();
const {
    USERS_UPLOADS_DIR,
    AVATAR_DEFAULT,
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

// Importamos funciones Helpers para usar las funciones de firstWordCapitaly manejar los nulos que puedan venir del front
const {
    helpers
} = require('../../helpers');

// importamos la conexion de sequelize y mysql
const {
    connectionDB
} = require('../../config');

// importamos
const {
    Sequelize,
} = require('sequelize');


// Ubicación de la carpeta usuarios don de se alojaran los archivos
const userImagePathDir = path.join(__dirname, `../${USERS_UPLOADS_DIR}`);


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

            // Manejamos los nulls o undefined  de los campos no requeridos y los procesamos para guardarlos en la base de datos formateados
            image = helpers.handleEmptyField(image);
            surname = helpers.firstWordCapitalize(helpers.handleEmptyField(surname).toLowerCase());
            genre = helpers.handleEmptyFieldArray(genre);
            company = helpers.firstWordCapitalize(helpers.handleEmptyField(company));
            address = helpers.firstWordCapitalize(helpers.handleEmptyField(address).toLowerCase());
            email = helpers.handleEmptyField(email).toLowerCase();
            phone = helpers.handleEmptyField(phone);
            mobile.trim();
            website = helpers.handleEmptyField(website).toLowerCase();

            // Procesamos la imagen que recibimos del lado del cliente, 3 parametros los cuales son (locationPath, fileImage, sizeImage)
            let savedFileName;
            if (request.files && request.files.image) {
                try {
                    let uploadImageBody = request.files.image;
                    savedFileName = await helpers.processAndSavePhoto(userImagePathDir, uploadImageBody, 300, 300);
                } catch (error) {
                    return response.status(400).json({
                        status: 'error',
                        code: 400,
                        message: 'La imagen no ha sido procesada correctamente ,por favor intentalo de nuevo'
                    });
                }
            } else {
                let randomImage = Math.floor(Math.random() * 8) + 1;
                const avatarImage = 'avatar-' + `${randomImage}` + '.jpg';
                const pathImageDefault = path.join(`./${AVATAR_DEFAULT}`, `./${avatarImage}`);
                image = pathImageDefault;
                savedFileName = image;
            }

            // Procesamos va para evitar espacios al principio y al final que el usuario nos pueda enviar
            const nameTrimmed = helpers.firstWordCapitalize(name.toLowerCase());


            // Insertamos la info en la base de datos
            const users = await UsersModel.create({
                image: savedFileName,
                name: nameTrimmed,
                surname: surname,
                genre: genre,
                company: company,
                address: address,
                email: email,
                phone: phone,
                mobile: mobile,
                website: website,
                created_at: Sequelize.literal('NOW()'),
                updated_at: Sequelize.literal('NOW()'),
            })

            // Mandamos una respuesta en formato JSON para catchearlo en la petición desde el front
            response.send({
                status: 200,
                data: {
                    users: {
                        id: users.id,
                        image: savedFileName,
                        name: nameTrimmed,
                        surname: surname,
                        genre: genre,
                        company: company,
                        address: address,
                        email: email,
                        phone: phone,
                        mobile: mobile,
                        website: website,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                },
                message: `Se ha añadido un nuevo usuario a tu lista de contactos`
            });

        } catch (error) {
            // Si hay algún error lo mandamos al middleware de errores
            next(error);
        } finally {
            connectionDB.sync();
        }
    },
};