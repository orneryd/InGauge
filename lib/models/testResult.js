'use strict';

var mongoose = require('mongoose'),
    questionResultSchema = require('./questionResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var testResultSchema = new Schema({
    startTime: Date,
    endTime: Date,
    testName: String,
    questionResults: [questionResultSchema],
    student: String
});

/**
 * Validations
 */
/*testResultSchema.path('testName').validate(function (text) {
  return !!text;
}, 'Answer text must be present');*/

mongoose.model('testResult', testResultSchema);
