'use strict';

var mongoose = require('mongoose'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var actionSchema = new Schema({
    type: String,
    student: studentSchema,
    startTime: Date,
    state: String
});

mongoose.model('action', actionSchema);
