'use strict';

var mongoose = require('mongoose'),
    pollResultSchema = require('./pollResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollSchema = new Schema({
    pollStart: Date,
    pollEnd: Date,
    results: [pollResultSchema]
});

mongoose.model('poll', pollSchema);
