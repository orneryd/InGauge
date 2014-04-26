'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var userSchema = new Schema({
    email: String,
    passwordHash: String,
    passwordSalt: String
});

/**
 * Validations
 */
/*answerSchema.path('text').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('user', userSchema);
