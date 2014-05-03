'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentResultSchema = new Schema({
    assessmentId: String,
    questionId: String,
    student: String,
    result: answerSchema
});

mongoose.model('questionResult', assessmentResultSchema);
