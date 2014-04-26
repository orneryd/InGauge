'use strict';

var mongoose = require('mongoose'),
    questions = mongoose.model('question'),
    tests = mongoose.model('test'),
    students = mongoose.model('student'),
    testsResults = mongoose.model('testResult'),
    moment = require('moment');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
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
tests.find({}).remove(function(){
    tests.create({
        name: "Math 101-A"
    },{
        name: "Science 103-B"
    },{
        name: "Science A-101"
    },{
        name: "Math 103-C"
    },{
        name: "Writing 100-3"
    },{
        name: "Reading 105-4"
    },{
        name: "Carpentry 101-Final"
    },{
        name: "Home Economics 102-Pop-Quiz"
    }, function() {
        console.log('finished populating tests');
    });
});
testsResults.find({}).remove(function(){
    testsResults.create({
        startTime: moment.utc(),
        endTime: moment.utc().add("minutes", 30),
        testName: "Science A-101",
        student: "Desmond",
        questionResults: [{
            text: 'how far away is the Sun?',
            givenAnswer: {
                text: "92,960,000 miles.", 
                correct: true 
            }
        },{
            text: "how far away is the Moon?",
            givenAnswer: {
                text: "238,900 miles.",
                correct: true
            }
        }]
    },{
        startTime: moment.utc(),
        endTime: moment.utc().add("minutes", 30),
        testName: "Math 101-A",
        student: "Lincoln",
        questionResults: [{
            text: 'how many apples does John have?',
            givenAnswer: {
                text: "10",
                correct: false
            }
        },{
            text: "how many snacks does Scooby have?",
            givenAnswer: {
                text: "not enough.",
                correct: true
            }
        }]
    },{
        startTime: moment.utc(),
        endTime: moment.utc().add("minutes", 30),
        testName: "Math 101-A",
        student: "Aislin",
        questionResults: [{
            text: 'how many apples does John have?',
            givenAnswer: {
                text: "5",
                correct: true
            }
        },{
            text: "how many snacks does Scooby have?",
            givenAnswer: {
                text: "not enough.",
                correct: true
            }
        }]
    });
});

