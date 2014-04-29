'use strict';

var mongoose = require('mongoose'),
    actionSchema = require('./pollResult'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    results: [actionSchema]
});

mongoose.model('poll', pollSchema);
