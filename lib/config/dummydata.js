'use strict';

var mongoose = require('mongoose'),
    questions = mongoose.model('question'),
    students = mongoose.model('student'),
    poll = mongoose.model('poll'),
    moment = require('moment');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
poll.find({}).remove();

students.find({}).remove(function(){
    students.create({
        name: "Abraham"
    },{
        name: "Tim"
    },{
        name: "Xanthe"
    },{
        name: "Michael"
    },{
        name: "Justin"
    },{
        name: "Tara"
    },{
        name: "George"
    },{
        name: "Emily"
    },{
        name: "Stephen"
    },{
        name: "Trevor"
    },{
        name: "Jamie"
    });
});

questions.find({}).remove(function(){
    questions.create({
            testName: "Math 101-A",
            text: 'Who was the 4th President of the U.S.?',
            answers: [
                {text: "Washington"},
                {text: "Monroe", correct: true },
                {text: "Jefferson"},
                {text: "Adams"}
            ]
        }, {
            testName: "Math 101-A",
            text: 'How many U.S. States are there?',
            answers: [
                {text: "50", correct: true },
                {text: "13"},
                {text: "46"},
                {text: "51"}
            ]
        }, {
            testName: "Science A-101",
            text: 'How many Chromebooks did Jamie sell his first year?',
            answers: [
                {text: "147", correct: true },
                {text: "50,000"},
                {text: "1,000,000"},
                {text: "Apple"}
            ]
        }, function() {
            console.log('finished populating questions');
        }
    );
    
});

