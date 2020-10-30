'use strict';
//const Joi = require('joi');
const Joi = require('joi-plus');
const JoiPhone = Joi.extend(require('joi-phone-number'));
const sanitizeHtml = require('sanitize-html');
const {
    helper
} = require('../helpers');

module.exports = Joi.object().keys({
    image: Joi.any(),

    name: Joi.string().escape().unescape().sanitize(sanitizeHtml)
        .trim()
        .min(0)
        .max(50)
        .required()
        .options({
            convert: false
        })
        .messages({
            'string.escape': 'El nombre no debe contener los siguientes carácteres: & > < \" \' / \\ \` \; \} \{ ',
            'string.min': 'El nombre debe contener por lo menos 3 carácteres',
            'string.max': 'El nombre no debe exceder de 50 carácteres',
            'string.trim': 'El nombre no debe contener espacios ni al principio ni al final',
            'string.empty': 'El campo nombre es obligatorio y no puede estar vacio'
        }),

    surname: Joi.string().escape()
        .allow("")
        .min(3)
        .max(50)
        .trim()
        .options({
            convert: false
        })
        .messages({
            'string.escape': 'El apellido no debe contener los siguientes carácteres: & > < \" \' / \\ \`',
            'string.min': 'El apellido debe contener por lo menos 2 carácteres',
            'string.max': 'Los apellidos no deben exceder de 50 carácteres',
            'string.trim': 'El apellido no debe contener espacios ni al principio ni al final',
        }),

    genre: Joi.string()
        .empty("")
        .allow(""),

    company: Joi.string()
        .empty("")
        .allow("")
        .trim()
        .min(2)
        .max(20)
        .options({
            convert: false
        })
        .messages({
            'string.min': 'El campo empresa debe contener por lo menos 2 carácteres',
            'string.max': 'El campo empresa no debe exceder de 20 carácteres',
            'string.trim': 'El campo empresa no debe contener espacios ni al principio ni al final',
        }),

    address: Joi.string()
        .empty("")
        .allow("")
        .max(200)
        .messages({
            'string.max': 'El campo empresa no debe exceder de 30 carácteres',
        }),

    email: Joi.string()
        .email()
        .empty("")
        .allow("")
        .trim()
        .options({
            convert: false
        })
        .lowercase()
        .messages({
            'string.email': 'Debes introducir un email valido',
            'string.trim': 'El email no debe contener espacios',
        }),

    phone: JoiPhone.string()
        .empty("")
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        }).allow(""),


    mobile: JoiPhone.string()
        .min(9)
        .max(30)
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        })
        .options({
            convert: false
        })
        .required()
        .trim()
        .messages({
            'string.min': 'El campo movil debe contener mínimo 9 cáracteres',
            'string.phoneNumber': 'Debes introducir un numero de telefono valido',
            'string.trim': 'El numero movil no debe contener espacios al comienzo ni al final',
            'string.empty': 'El campo movil es obligatorio y no puede estar vacio'
        }),

    website: Joi.string()
        .allow("")
        .trim()
});