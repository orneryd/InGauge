'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var answerSchema = new Schema({
    text: String,
    correct: Boolean
});

/**
 * Validations
 */
/*answerSchema.path('text').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('answer', answerSchema);