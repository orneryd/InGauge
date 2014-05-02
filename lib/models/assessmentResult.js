'use strict';

var mongoose = require('mongoose'),
    answerSchema = require('./answer'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var assessmentResultSchema = new Schema({
    assessmentId: String,
    student: studentSchema,
    results: [answerSchema]
});

mongoose.model('questionResult', assessmentResultSchema);
