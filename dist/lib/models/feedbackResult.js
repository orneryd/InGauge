'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var feedbackResult = new Schema({
    accountId: String,
    userId: String,
    sessionId: String,
    feedbackId: String,
    student: String,
    text: String
});

/**
 * Validations
 */
/*testResultSchema.path('testName').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('feedbackResult', feedbackResult);
