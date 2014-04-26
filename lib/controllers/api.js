'use strict';

var mongoose = require('mongoose'),
    http = require('http'),
    q = require("q"),
    entities = {
        question: mongoose.model('question'),
        student: mongoose.model('student'),
        testresult: mongoose.model('testResult'),
        test: mongoose.model('test'),
        poll: mongoose.model('poll'),
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
exports.postPolls = function(req, res) {
    var deferred = q.defer();
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
exports.postPollResults = function(req, res) {
    var deferred = q.defer();
    var pollId = req.params.pollId;
    entities.poll.update({
        _id: pollId
    },{
        $push: {
            results : req.body
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
/*exports.get = function(req, res) {
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
