'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var questionSchema = new Schema({
    text: String,
    answers: [answerSchema]
});

mongoose.model('question', questionSchema);
