'use strict';

var mongoose = require('mongoose'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var feedbackResult = new Schema({
    student: studentSchema,
    text: String
});

/**
 * Validations
 */
/*testResultSchema.path('testName').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('feedbackResult', feedbackResult);
