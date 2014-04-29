'use strict';

var mongoose = require('mongoose'),
    studentSchema = require('./student'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollResultSchema = new Schema({
    type: String,
    student: studentSchema,
    // 0 cruise control
    // 1 = slow down
    // 2 = speed up
    state: Number
});

mongoose.model('pollResult', pollResultSchema);
