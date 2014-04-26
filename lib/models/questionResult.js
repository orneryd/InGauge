'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var questionResultSchema = new Schema({
    startTime: Date,
    endTime: Date,
    text: String,
    givenAnswer: answerSchema
});

mongoose.model('questionResult', questionResultSchema);
