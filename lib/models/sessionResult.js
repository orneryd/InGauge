'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var sessionResultSchema = new Schema({
    student: String,
    // 0 cruise control
    // 1 = slow down
    // 2 = speed up
    state: Number
});

mongoose.model('sessionResult', sessionResultSchema);
