'use strict';

var mongoose = require('mongoose'),
    sessionResultSchema = require('./sessionResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var sessionSchema = new Schema({
    userId: {
        type: String,
        lowercase: true,
        required: true
    },
    code: {
        type: String,
        uppercase: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: Date,
    end: Date,
    results: [sessionResultSchema]
});

mongoose.model('session', sessionSchema);
