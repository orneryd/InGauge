'use strict';

var mongoose = require('mongoose'),
    questionSchema = require('./question'),
    assessmentResultSchema = require('./assessmentResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentSchema = new Schema({
    userId: String,
    name: String,
    start: Date,
    end: Date,
    questions: [questionSchema],
    results: [assessmentResultSchema]
});

/**
 * Validations
 */
/*testSchema.path('name').validate(function (text) {
  return !!text;
}, 'You must name the test.');*/

mongoose.model('assessment', assessmentSchema);
