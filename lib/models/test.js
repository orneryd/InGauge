'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var testSchema = new Schema({
    name: String
});

/**
 * Validations
 */
/*testSchema.path('name').validate(function (text) {
  return !!text;
}, 'You must name the test.');*/

mongoose.model('test', testSchema);
