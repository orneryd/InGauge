'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var studentSchema = new Schema({
    name: String,
    grade: String
});

/**
 * Validations
 */
/*studentSchema.path('name').validate(function (text) {
  return !!text;
}, 'Student must have a name');*/

mongoose.model('student', studentSchema);
