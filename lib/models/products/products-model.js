'use strict';
const schema = require('./products-schema.js');
const Model = require('../mongo.js');

/**
* Model Model
* @constructor Products
*/

class products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new products();
