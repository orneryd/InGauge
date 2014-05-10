'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var sessionSchema = new Schema({
    accountId: {
        type: String,
        lowercase: true,
        required: true
    },
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
    end: Date
});

mongoose.model('session', sessionSchema);
