'use strict';

var mongoose = require('mongoose'),
    questionSchema = require('./question'),
    questionResultSchema = require('./questionResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentSchema = new Schema({
    start: Date,
    end: Date,
    question: questionSchema,
    results: [questionResultSchema]
});

/**
 * Validations
 */
/*testSchema.path('name').validate(function (text) {
  return !!text;
}, 'You must name the test.');*/

mongoose.model('assessment', assessmentSchema);
