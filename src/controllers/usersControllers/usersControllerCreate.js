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

// Importamos funciones Helpers :
// firstWordCapitalize ( se encarga  de poner la primera letra de cada palabra en mayusculas)
// handleEmptyField ( se encarga de gestinar los campos null || undefined  y los reemplaza por "Sin especificar")
// processAndSavePhoto ( se encarga de procesar el fileImage que vengan de front )
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
const userImagePathDir = path.join(__dirname, `../../${USERS_UPLOADS_DIR}`);


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
                facebook,
                instagram,
                twitter,
                youtube,
                linkedin,
            } = request.body;

            // Manejamos los nulls o undefined  de los campos no requeridos
            // Formateamos info antes de guardarla en la base de datos
            // Procesamos info evitando espacios al principio y al final, texto en mayusculas y demas...
            name = helpers.firstWordCapitalize(name);
            image = helpers.handleEmptyField(image);
            surname = helpers.firstWordCapitalize(helpers.handleEmptyField(surname));
            genre = helpers.handleEmptyFieldArray(genre);
            company = helpers.firstWordCapitalize(helpers.handleEmptyField(company));
            address = helpers.firstWordCapitalize(helpers.handleEmptyField(address));
            email = helpers.handleEmptyField(email).toLowerCase();
            phone = helpers.handleEmptyField(phone);
            mobile = mobile.trim();
            website = helpers.handleEmptyField(website).toLowerCase();
            facebook = helpers.handleEmptyField(facebook).toLowerCase();
            instagram = helpers.handleEmptyField(instagram).toLowerCase();
            twitter = helpers.handleEmptyField(twitter).toLowerCase();
            youtube = helpers.handleEmptyField(youtube).toLowerCase();
            linkedin = helpers.handleEmptyField(linkedin).toLowerCase();


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
                // Creamos variable que se encargara de asignar una imagen aleatoria a cada usuario que no envie imagen
                let randomImage = Math.floor(Math.random() * 8) + 1;

                // Creacion del nombre del archivo ex: avatar-5.jpg
                const avatarImage = 'avatar-' + `${randomImage}` + '.jpg';

                // creamos path del archivo
                const pathImageDefault = path.join(`./${AVATAR_DEFAULT}`, `./${avatarImage}`);

                // Asignamos este valor a image y este a su vez a savedFileName para que salga de la condicion null || undefined con el valor que le hemos asigando por defecto
                image = pathImageDefault;
                savedFileName = image;
            }

            // Insertamos la info en la base de datos
            const users = await UsersModel.create({
                image: savedFileName,
                name: name,
                surname: surname,
                genre: genre,
                company: company,
                address: address,
                email: email,
                phone: phone,
                mobile: mobile,
                website: website,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                youtube: youtube,
                linkedin: linkedin,
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
                        name: name,
                        surname: surname,
                        genre: genre,
                        company: company,
                        address: address,
                        email: email,
                        phone: phone,
                        mobile: mobile,
                        website: website,
                        facebook: facebook,
                        instagram: instagram,
                        twitter: twitter,
                        youtube: youtube,
                        linkedin: linkedin,
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