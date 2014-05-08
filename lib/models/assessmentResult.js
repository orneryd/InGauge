'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentResultSchema = new Schema({
    accountId: String,
    userId: String,
    sessionId: String,
    assessmentId: String,
    questionId: String,
    student: String,
    result: answerSchema
});

mongoose.model('assessmentResult', assessmentResultSchema);
