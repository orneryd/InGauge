'use strict';

var mongoose = require('mongoose'),
    assessments = mongoose.model('assessment'),
    users = mongoose.model('user'),
    questions = mongoose.model('question'),
    sessions = mongoose.model('session'),
    moment = require('moment');

/**
 * Populate database with sample application data
 */
//Clear old things, then add things in
users.find({}).remove(function(){
    users.create({
        /* username/email */
        _id: "teacher@test.com",
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        firstName: "Test",
        lastName: "Teacher",
        /* password is password*/
        passwordHash: "sha1$b4efb820$1$3f52fc2c5b98039bd06f7555705738a3824f5e95",
    }, function() {
        console.log('finished populating users');
    });
});

sessions.find({}).remove(function(){
    sessions.create({
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        title: "Dummy Session",
        code: Math.random().toString(36).slice(12)
    }, function() {
        console.log('finished populating sessions');
    });
});

assessments.find({}).remove(function(){
    assessments.create({
        _id: 9001,
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        name: "Dummy Assessment"
    }, function() {
        console.log('finished populating assessments');
    });

});

questions.find({}).remove(function(){
    questions.create({
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: 9001,
        text: 'Who was the 4th President of the U.S.?',
        answers: [
            {text: "Washington"},
            {text: "Monroe", correct: true },
            {text: "Jefferson"},
            {text: "Adams"}
        ]
    }, {
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: 9001,
        text: 'How many U.S. States are there?',
        answers: [
            {text: "50", correct: true },
            {text: "13"},
            {text: "46"},
            {text: "51"}
        ]
    }, {
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: 9001,
        text: 'How many Chromebooks did Jamie sell his first year?',
        answers: [
            {text: "147", correct: true },
            {text: "50,000"},
            {text: "1,000,000"},
            {text: "Apple"}
        ]
    }, function(){
        console.log('finished populating questions');
    });
});