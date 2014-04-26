'use strict';

var mongoose = require('mongoose'),
    actionSchema = require('./action'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    actions: [actionSchema]
});

mongoose.model('poll', pollSchema);
