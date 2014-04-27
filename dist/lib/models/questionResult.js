'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var questionResultSchema = new Schema({
    student: studentSchema,
    givenAnswer: answerSchema
});

mongoose.model('questionResult', questionResultSchema);
