'use strict';

require('dotenv').config();
const path = require('path');
const sharp = require('sharp');
const fsExtra = require('fs-extra');
const fs = require('fs').promises;
const uuid = require('uuid');


const helpers = {
  formatDateToDB: (date) => {
    return format(date, `yyyy-MM-dd HH:mm:ss`);
  },
  errorGenerator: (message, code) => {
    const error = new Error(message);
    if (code) error.httpCode = code;
    return error;
  },
  processAndSavePhoto: async (pathImage, fileImage, imageWidth = 500, imageHeight = 300) => {
    //Random generated name to save it
    const savedFileName = `${uuid.v1()}.jpg`;

    //Ensure path
    await fsExtra.ensureDir(pathImage);

    //Process image
    const finalImage = sharp(fileImage.data);

    //Make sure image is not wider than 500px
    const imageInfo = await finalImage.metadata();

    if (imageInfo.width > imageWidth && imageInfo.height > imageHeight) {
      finalImage.resize(imageWidth, imageHeight);
    }
    //Save image
    await finalImage.toFile(path.join(pathImage, savedFileName));


    return savedFileName;
  },

  firstWordCapitalize: (word) => {
    return word.toLowerCase()
      .trim()
      .split(' ')
      .map(v => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  },

  handleEmptyField: (variable = 'sin especificar') => {
    if (variable === null || variable === "" || variable === undefined) {
      variable = 'sin especificar';
    }
    return variable;
  },

  handleEmptyFieldArray: (variable) => {
    if (variable === null || variable === undefined || variable === "") {
      variable = 'Otro';
    }
    return variable;
  },
  createFolder: async (pathFolderName) => {
    try {
      await fs.mkdirSync(process.cwd() + `${pathFolderName}`, {
        recursive: true
      });
      console.log(`Directorio creado con exito`);
    } catch (error) {
      return error;
    }
  },
}
module.exports = {
  helpers
};