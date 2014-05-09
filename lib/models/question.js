'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var questionSchema = new Schema({
    accountId: String,
    userId: String,
    assessmentId: String,
    text: String,
    answers: [answerSchema]
});

mongoose.model('question', questionSchema);
