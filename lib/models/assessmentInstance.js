'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentInstanceSchema = new Schema({
    assessmentId: String,
    accountId: String,
    userId: String,
    sessionId: String,
    title: String,
    start: Date,
    end: Date
});

/**
 * Validations
 */
/*testSchema.path('name').validate(function (text) {
  return !!text;
}, 'You must name the test.');*/

mongoose.model('assessmentInstance', assessmentInstanceSchema);
