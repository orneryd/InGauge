'use strict';

var mongoose = require('mongoose'),
    assessments = mongoose.model('assessment'),
    assessmentInstances = mongoose.model('assessmentInstance'),
    users = mongoose.model('user'),
    questions = mongoose.model('question'),
    answers = mongoose.model('answer'),
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
var session = new sessions({
    accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
    userId: "teacher@test.com",
    title: "Dummy Session",
    code: Math.random().toString(36).slice(12)
});
sessions.find({}).remove(function(){
    sessions.create(session, function() {
        console.log('finished populating sessions');
    });
});
var assessment = new assessments({
    accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
    userId: "teacher@test.com",
    title: "Dummy Assessment"
});

assessments.find({}).remove(function(){
    assessments.create(assessment, function() {
        console.log('finished populating assessments');
    });
});

assessmentInstances.find({}).remove(function(){
    assessmentInstances.create({
        sessionId: session._id,
        assessmentId: assessment._id,
        accountId: assessment.accountId,
        userId: assessment.userId,
        title: assessment.title
    }, function(){
        console.log('finished populating assessmentInstances');
    });
});

questions.find({}).remove(function(){
    questions.create({
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: assessment._id,
        text: 'Who was the 4th President of the U.S.?',
        answers: [
            new answers({text: "Washington"}),
            new answers({text: "Monroe", correct: true }),
            new answers({text: "Jefferson"}),
            new answers({text: "Adams"})
        ]
    }, {
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: assessment._id,
        text: 'How many U.S. States are there?',
        answers: [
            new answers({text: "50", correct: true }),
            new answers({text: "13"}),
            new answers({text: "46"}),
            new answers({text: "51"})
        ]
    }, {
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9",
        userId: "teacher@test.com",
        assessmentId: assessment._id,
        text: 'How many Chromebooks did Jamie sell his first year?',
        answers: [
            new answers({text: "147", correct: true }),
            new answers({text: "50,000"}),
            new answers({text: "1,000,000"}),
            new answers({text: "Apple"})
        ]
    }, function(err) {
        console.log('finished populating questions');
    });
});

