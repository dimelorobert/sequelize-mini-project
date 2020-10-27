'use strict';
const Joi = require('joi');
const JoiPhone = Joi.extend(require('joi-phone-number'));
const {
    helpers
} = require('../helpers');

console.log(Object.keys(Joi));
module.exports = Joi.object().keys({
    image: Joi.any(),

    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .options({
            convert: false
        })
        .messages({
            'string.min': 'El nombre debe contener por lo menos 2 carácteres',
            'string.max': 'El nombre no debe exceder de 50 carácteres',
            'string.trim': 'El nombre no debe contener espacios ni al principio ni al final',
            'string.empty': 'El campo nombre es obligatorio y no puede estar vacio'
        }),

    surname: Joi.string()
        .allow("")
        .min(3)
        .max(30)
        .trim()
        .options({
            convert: false
        })
        .messages({
            'string.min': 'El apellido debe contener por lo menos 2 carácteres',
            'string.max': 'Los apellidos no deben exceder de 50 carácteres',
            'string.trim': 'El apellido no debe contener espacios ni al principio ni al final',
        }),

    genre: Joi.string().empty()
        .allow(""),

    company: Joi.string()
        .allow("")
        .lowercase()
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
        .allow("")
        .max(200)
        .messages({
            'string.max': 'El campo empresa no debe exceder de 30 carácteres',
        }),

    email: Joi.string()
        .email()
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
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        }).allow(""),


    mobile: JoiPhone.string()
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        })
        .required()
        .options({
            convert: false
        })
        .trim()
        .messages({
            'string.phoneNumber': 'Debes introducir un numero de telefono valido',
            'string.trim': 'El numero movil no debe contener espacios al comienzo ni al final',
            'string.empty': 'El campo movil es obligatorio y no puede estar vacio'
        }),

    website: Joi.string()
        .allow("")
        .trim()
});