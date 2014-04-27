'use strict';

var mongoose = require('mongoose'),
    http = require('http'),
    q = require("q"),
    moment = require("moment"),
    entities = {
        question: mongoose.model('question'),
        student: mongoose.model('student'),
        testresult: mongoose.model('testResult'),
        poll: mongoose.model('poll'),
        assessment: mongoose.model('assessment'),
        action: mongoose.model('action')
    };

// socket.io settings
/**
 * Get awesome things
 */
exports.get = function(req, res) {
    var type = req.params.type.toLowerCase();
    var callback = function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    };
    if(req.params.id){
        entities[type].findOne({_id: req.params.id}, callback);
    } else {
        entities[type].find(callback);
    }
};

exports.getActivePoll = function(req, res) {
    entities.poll.findOne({ end: null }, function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    });
};
exports.getActiveAssessment = function(req, res) {
    entities.assessment.findOne({ end: null }, function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    });
};

exports.getCurrentPollResults = function(req, res) {
    entities.poll.findOne({ end: null }, function(err, poll) {
        // do logic
        // find latest actions per student
        // if action.created.add("seconds", 30) < now state = 0
        // return 
        var students = {};
        if (!poll) {
            res.send(404);
            return;
        }

        poll.actions.forEach(function(item, i){
            students[item.student.name] = item;
        });
        if (!err) {
            return res.json(students);
        } else {
            return res.send(err);
        }
    });
};
exports.getCurrentAssessmentResults = function(req, res) {
    entities.assessment.findOne({ end: null }, function(err, assessment) {
        // do logic
        // find latest actions per student
        // if action.created.add("seconds", 30) < now state = 0
        // return 
        if (!err) {
            var students = {};
            if (!assessment || !assessment.questionResults.length) {
                res.send(404);
                return;
            }
            assessment.questionResults.forEach(function(item, i){
                students[item.student.name] = item;
            });

            return res.json(students);
        } else {
            return res.send(err);
        }
    });
};

exports.createPolls = function(req, res) {
    var deferred = q.defer();
    req.body.start = moment.utc();
    entities.poll.create(req.body, function(err, poll){
        if (!err) {
            deferred.resolve();
            return res.send(201, "/api/poll/" + poll._id);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.updatePolls = function(req, res) {
    var deferred = q.defer();
    entities.poll.findOne({_id: req.params.id}, function(err, poll){
        if (err) { return next(err); }
        poll.end = moment.utc();
        poll.save(function(err) {
            if (!err) {
                deferred.resolve();
                return res.send(200);
            } else {
                deferred.reject(err);
                return next(err);
            }
        });
    });
    return deferred.promise;
};

exports.updateAssessment = function(req, res) {
    var deferred = q.defer();
    entities.assessment.findOne({_id: req.params.id}, function(err, assessment){
        if (err) { return next(err); }
        assessment.end = moment.utc();
        assessment.save(function(err) {
            if (!err) {
                deferred.resolve();
                return res.send(200);
            } else {
                deferred.reject(err);
                return next(err);
            }
        });
    });
    return deferred.promise;
};

exports.postPollAction = function(req, res) {
    var deferred = q.defer();
    req.body.created = moment.utc();
    entities.poll.update({
        _id: req.params.id
    },{
        $push: {
            actions : req.body
        }
    },{
        upsert: true
    }, function(err){
        if (!err) {
            deferred.resolve();
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.postQuestionResult = function(req, res) {
    var deferred = q.defer();
    entities.assessment.update({
        _id: req.params.id
    },{
        $push: {
            questionResults : req.body
        }
    },{
        upsert: true
    }, function(err){
        if (!err) {
            deferred.resolve();
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.postStudents = function(req, res) {
    var deferred = q.defer();
    entities.student.create(req.body, function(err, student){
        if (!err) {
            deferred.resolve();
            return res.send(201, "/api/student/" + student._id);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.postAssessment = function(req, res) {
    var deferred = q.defer();
    req.body.start = moment.utc();
    entities.assessment.create(req.body, function(err, assessment){
        if (!err) {
            deferred.resolve();
            return res.send(201, assessment);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
/*

*//* POST methods *//*
exports.postQuestions = function(req, res) {
    var deferred = q.defer();
    entities.question.create(req.body, function(err, question){
        if (!err) {
            var response = "/api/question/" + question._id;
            deferred.resolve(response);
            return res.send(201, response);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.postQuestionResult = function(req, res) {
    var deferred = q.defer();
    var testResultId = req.params.testResultId;
    entities.testresult.update({
        _id: testResultId
    },{
        $push: { 
            questionResults : req.body 
        }
    },{
        upsert: true
    }, function(err){
        if (!err) {
            deferred.resolve();
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.createTestResults = function(req, res) {
    var deferred = q.defer();
    entities.testresult.create(req.body, function(err, result){
        if (!err) {
            var response = "/api/testresult/" + result._id;
            deferred.resolve(response);
            return res.send(201, response);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.updateTestResults = function(req, res) {
    var deferred = q.defer();
    var testResultId = req.params.testResultId;
    entities.testresult.update({
        _id: testResultId
    }, req.body, {
        upsert: true
    }, function(err, result){
        if (!err) {
            var response = "/api/testresult/" + result._id;
            deferred.resolve(response);
            return res.send(201, response);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.postStudents = function(req, res) {
    var deferred = q.defer();
    entities.student.create(req.body, function(err, student){
        if (!err) {
            deferred.resolve();
            return res.send(201, "/api/student/" + student._id);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};*/
