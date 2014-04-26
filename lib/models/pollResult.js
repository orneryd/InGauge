'use strict';

var mongoose = require('mongoose'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollResultSchema = new Schema({
    student: studentSchema,
    state: Boolean
});

mongoose.model('pollResult', pollResultSchema);
