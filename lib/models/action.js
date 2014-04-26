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
    created: Date,
    // cruise control
    // 1 = slow down
    // 2 = speed up
    state: Number
});

mongoose.model('action', actionSchema);
