'use strict';
const Joi = require('joi');
const JoiPhone = Joi.extend(require('joi-phone-number'));
const {
    helpers
} = require('../helpers');


module.exports = Joi.object().keys({

    name: Joi.string()
        .lowercase()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.min': 'El nombre debe contener por lo menos 2 carácteres',
            'string.max': 'El nombre no debe exceder de 50 carácteres',
            'string.trim': 'El nombre no debe contener espacios ni al principio ni al final',
            'string.empty': 'El campo nombre es obligatorio y no puede estar vacio'
        }),

    surname: Joi.string()
        .lowercase()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': 'El apellido debe contener por lo menos 2 carácteres',
            'string.max': 'Los apellidos no deben exceder de 50 carácteres',
            'string.trim': 'El apellido no debe contener espacios ni al principio ni al final',
            'string.empty': 'El campo apellido es obligatorio y no puede estar vacio'
        }, 400),

    /*genre: Joi.string(),

    company: Joi.string()
        .lowercase()
        .trim()
        .min(2)
        .max(20)
        .required()
        .messages({
            'string.min': 'El campo empresa debe contener por lo menos 2 carácteres',
            'string.max': 'El campo empresa no debe exceder de 20 carácteres',
            'string.trim': 'El campo empresa no debe contener espacios al principio ni al final',
            'string.empty': 'El campo empresa es obligatorio y no puede estar vacio'
        }),

    address: Joi.string()
        .max(200)
        .messages({
            'string.max': 'El campo empresa no debe exceder de 30 carácteres',
        }),

    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .empty('email@email.com')
        .messages({
            'string.email': 'Debes introducir un email valido',
            'string.trim': 'El email no debe contener espacios',
        }),*/

    phone: JoiPhone.string()
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        }),

    mobile: JoiPhone.string()
        .phoneNumber({
            defaultCountry: 'ES',
            format: 'international'
        }).required(),
    /*website: Joi.string()
    .lowercase()
    .trim()*/
});