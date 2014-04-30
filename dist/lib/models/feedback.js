'use strict';

var mongoose = require('mongoose'),
    feedbackResultSchema = require('./feedbackResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var feedbackSchema = new Schema({
    start: Date,
    end: Date,
    results: [feedbackResultSchema]
});

/**
 * Validations
 */
/*testResultSchema.path('testName').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('feedback', feedbackSchema);
