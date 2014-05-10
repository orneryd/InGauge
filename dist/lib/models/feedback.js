'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var feedbackSchema = new Schema({
    accountId: String,
    userId: String,
    sessionId: String,
    start: Date,
    end: Date
});

/**
 * Validations
 */
/*testResultSchema.path('testName').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('feedback', feedbackSchema);
