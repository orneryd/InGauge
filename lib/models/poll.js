'use strict';

var mongoose = require('mongoose'),
    actionSchema = require('./action'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var pollSchema = new Schema({
    name: String,
    pollStart: Date,
    pollEnd: Date,
    actions: [actionSchema]
});

mongoose.model('poll', pollSchema);
