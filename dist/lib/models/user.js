'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var userSchema = new Schema({
    _id: {
        type: String,
        lowercase: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }
});

/**
 * Validations
 */

mongoose.model('user', userSchema);
