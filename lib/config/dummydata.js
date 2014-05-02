'use strict';

var mongoose = require('mongoose'),
    assessments = mongoose.model('assessment'),
    students = mongoose.model('student'),
    users = mongoose.model('user'),
    sessions = mongoose.model('session'),
    moment = require('moment');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
sessions.find({}).remove(function(){
    var q1 = Math.random().toString(36).slice(2);
    var q2 = Math.random().toString(36).slice(2);
    var q3 = Math.random().toString(36).slice(2);
    sessions.create({
        userId: "teacher@test.com",
        title: "Test Session",
        code: Math.random().toString(36).slice(12),
        assessments: [{
            _id: "9001",
            userId: "teacher@test.com",
            name: "Test Assessment",
            results: [{
                assessmentId: "9001",
                student: {
                    name: "Test Student"
                },
                results: [{
                    questionId: q1,
                    text: "Monroe", 
                    correct: true
                },{
                    questionId: q2,
                    text: "50",
                    correct: true
                },{
                    questionId: q3,
                    text: "147",
                    correct: true
                }]
            }],
            questions: [{
                id: q1,
                text: 'Who was the 4th President of the U.S.?',
                answers: [
                    {text: "Washington"},
                    {text: "Monroe", correct: true },
                    {text: "Jefferson"},
                    {text: "Adams"}
                ]
            }, {
                id: q2,
                text: 'How many U.S. States are there?',
                answers: [
                    {text: "50", correct: true },
                    {text: "13"},
                    {text: "46"},
                    {text: "51"}
                ]
            }, {
                id: q3,
                text: 'How many Chromebooks did Jamie sell his first year?',
                answers: [
                    {text: "147", correct: true },
                    {text: "50,000"},
                    {text: "1,000,000"},
                    {text: "Apple"}
                ]
            }]
        }],
        results: []
    }, function() {
        console.log('finished populating sessions');
    })
});
students.find({}).remove();

assessments.find({}).remove(function(){
    assessments.create({
        _id: "9001",
        userId: "teacher@test.com",
        name: "Test Assessment",
        results: [],
        questions: [{
            id: Math.random().toString(36).slice(2),
            text: 'Who was the 4th President of the U.S.?',
            answers: [
                {text: "Washington"},
                {text: "Monroe", correct: true },
                {text: "Jefferson"},
                {text: "Adams"}
            ]
        }, {
            id: Math.random().toString(36).slice(2),
            text: 'How many U.S. States are there?',
            answers: [
                {text: "50", correct: true },
                {text: "13"},
                {text: "46"},
                {text: "51"}
            ]
        }, {
            id: Math.random().toString(36).slice(2),
            text: 'How many Chromebooks did Jamie sell his first year?',
            answers: [
                {text: "147", correct: true },
                {text: "50,000"},
                {text: "1,000,000"},
                {text: "Apple"}
            ]
        }]
    }, function() {
        console.log('finished populating assessments');
    });
    
});

users.find({}).remove(function(){
    users.create({
        /* username/email */
        _id: "teacher@test.com",
        firstName: "Test",
        lastName: "Teacher",
        /* password is password*/
        passwordHash: "sha1$b4efb820$1$3f52fc2c5b98039bd06f7555705738a3824f5e95",
        accountId: "d72a1b40-d0f6-11e3-b5ab-dd4162f881e9"
    }, function() {
        console.log('finished populating users');
    });
});

