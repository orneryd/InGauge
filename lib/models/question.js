'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var questionSchema = new Schema({
    testName: String,
    multiChoice: Boolean,
    text: String,
    answers: [answerSchema]
});

mongoose.model('question', questionSchema);
