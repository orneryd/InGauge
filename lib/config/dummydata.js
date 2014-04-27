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
        name: "Aislin",
        grade: "Kindergarden"
    },{
        name: "Desmond",
        grade: "Preschool"
    },{
        name: "Lincoln",
        grade: "Toddler"
    });
});

questions.find({}).remove(function(){
    questions.create({
            testName: "Math 101-A",
            text: 'how many apples does John have?',
            answers: [
                {text: "10"},
                {text: "5", correct: true }
            ]
        }, {
            testName: "Math 101-A",
            text: 'how many snacks does Scooby have?',
            answers: [
                {text: "12"},
                {text: "not enough", correct: true }
            ]
        }, {
            testName: "Science A-101",
            text: 'how far away is the Moon?',
            answers: [
                {text: "10"},
                {text: "10,000"},
                {text: "45,876"},
                {text: "238,900 miles.", correct: true }
            ]
        }, {
            testName: "Science A-101",
            text: 'how far away is the Sun?',
            answers: [
                {text: "10"},
                {text: "92,960,000 miles.", correct: true }
            ]
        }, function() {
            console.log('finished populating questions');
        }
    );
    
});

