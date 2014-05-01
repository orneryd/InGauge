'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    passwordHash: String,
    accountId: String
});

/**
 * Validations
 */
/*studentSchema.path('name').validate(function (text) {
  return !!text;
}, 'Student must have a name');*/

mongoose.model('user', userSchema);
