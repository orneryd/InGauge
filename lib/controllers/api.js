'use strict';

var mongoose = require('mongoose'),
    http = require('http'),
    q = require("q"),
    moment = require("moment"),
    logic = require("./logic"),
    jwt = require('jsonwebtoken'),
    passwordHash = require('password-hash'),
    uuid = require('node-uuid'),
    users = mongoose.model('user'),
    entities = {
        question: mongoose.model('question'),
        session: mongoose.model('session'),
        assessment: mongoose.model('assessment'),
        feedback: mongoose.model('feedback')
    };

function getSupportedType(req, res){
    var type = req.params.type.toLowerCase();
    if (!entities[type]){
        res.send(404, "not supported");
        return null;
    }
    return entities[type];
}
/* Authentication */

exports.authUser = function(req, res) {
    users.findOne({ _id: req.body.username.toLowerCase()}, function(err, user) {
        console.log(req.body);
        console.log(user);
        if (err){
            return res.send(401, 'wrong username or password');
        }
        var isValid = passwordHash.verify(req.body.password, user.passwordHash);
        if (isValid){
            // We are sending the profile inside the token
            var token = jwt.sign({
                type: 1,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user._id,
                accoundId: user.accountId
            }, "shivakaminisomakandarkram", { expiresInMinutes: 999999 });
            return res.json({ token: token });
        } else {
            return res.send(401, 'wrong username or password');
        }
    });
};

exports.registerUser = function(req, res) {
    users.findOne({ _id: req.body.username.toLowerCase()}, function(err, user){
        if (err || user){
            return res.send(400, "user already exists.");
        } else {
            users.create({
                _id: req.body.username,
                passwordHash: passwordHash.generate(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                accountId: uuid.v1()
            }, function(err, user) {
                // We are sending the profile inside the token
                var token = jwt.sign({
                    type: 1,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user._id,
                    accoundId: user.accountId
                }, "shivakaminisomakandarkram", { expiresInMinutes: 999999 });
                return res.json({ token: token });
            });
        }
    });
};

exports.joinSession = function(req, res) {
    entities.session.findOne({ code: req.body.code.toUpperCase(), end: null}, function(err, session) {
        if (err || !session){
            return res.send(401, 'Invalid session code');
        }
        // We are sending the profile inside the token
        var token = jwt.sign({
            type: 0,
            session: session.code,
            sessionId: session._id,
            email: req.body.studentId
        }, "shivakaminisomakandarkram", { expiresInMinutes: 60 });
        return res.json({ token: token, sessionId: session._id });
    });
};

/**
 * Get awesome things
 */

exports.get = function(req, res) {
    var type = getSupportedType(req, res);
    if (!type) return;
    var callback = function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    };
    if(req.params.id){
        type.findOne({ _id: req.params.id }, callback);
    } else {
        type.find({ userId: req.user.email }, callback);
    }
};

exports.getResults = function(req, res) {    
    var type = getSupportedType(req, res);
    if (!type) return;
    type.findOne({ _id: req.params.id }, function(err, entity) {
        if (!err) {
            return res.json(logic.convertToResults(entity));
        } else {
            return res.send(err);
        }
    });
};

exports.postSession = function(req, res){
    var deferred = q.defer();
    if (req.user.type == 0){
        return deferred.promise;
    }
    req.body.userId = req.user.email;
    req.body.code = Math.random().toString(36).slice(12);
    entities.session.create(req.body, function(err, entity){
        if (!err) {
            deferred.resolve("session", entity._id);
            return res.send(201, entity);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.startSession = function(req, res) {
    var deferred = q.defer();
    if (req.user.type == 0){
        return deferred.promise;
    }
    entities.session.findOne({_id: req.params.id}, function(err, entity){
        if (err) { return res.send(err); }
        entity.start = moment.utc();
        entity.save(function(err) {
            if (!err) {
                deferred.resolve("session", entity._id);
                return res.send(204);
            } else {
                deferred.reject(err);
                return res.send(err);
            }
        });
    });
    return deferred.promise;
};

exports.post = function(req, res) {
    var deferred = q.defer();
    var type = getSupportedType(req, res);    
    if (req.user.type == 0 || !type){
        return deferred.promise;
    }
    req.body.userId = req.user.email;
    req.body.start = moment.utc();
    type.create(req.body, function(err, entity){
        if (!err) {
            deferred.resolve(req.params.type.toLowerCase(), entity._id);
            return res.send(201, entity);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.postQuestions = function(req, res) {
    var deferred = q.defer();
    if (req.user.type == 0){
        return deferred.promise;
    }
    req.body.id = Math.random().toString(36).slice(2);
    entities.assessment.update({
        _id: req.params.id,
        userId: req.user.email,
        end: null
    },{
        $push: {
            questions : req.body
        }
    },{
        upsert: true
    }, function(err){
        if (!err) {
            deferred.resolve("question", "");
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.postResult = function(req, res) {
    var deferred = q.defer();
    var type = getSupportedType(req, res);
    if (!type){
        return deferred.promise;
    }
    type.update({
        _id: req.params.id,
        end: null
    },{
        $push: {
            results : req.body
        }
    },{
        upsert: true
    }, function(err){
        if (!err) {
            deferred.resolve(req.params.type.toLowerCase() + "Result", "");
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.put = function(req, res) {
    var deferred = q.defer();
    var type = getSupportedType(req, res);
    if (req.user.type == 0 || !type){
        return deferred.promise;
    }
    type.findOne({_id: req.params.id}, function(err, entity){
        if (err) { return res.send(err); }
        entity.end = moment.utc();
        entity.save(function(err) {
            if (!err) {
                deferred.resolve(req.params.type.toLowerCase(), entity._id);
                return res.send(204);
            } else {
                deferred.reject(err);
                return res.send(err);
            }
        });
    });
    return deferred.promise;
};

exports.delete = function(req, res) {
    var deferred = q.defer();
    var type = getSupportedType(req, res);
    if (req.user.type == 0 || !type){
        return deferred.promise;
    }
    type.remove({_id: req.params.id}, function(err){
        if (!err) {
            deferred.resolve("session");
            return res.send(204);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};
exports.deleteQuestion = function(req, res) {
    var deferred = q.defer();
    if (req.user.type == 0){
        return deferred.promise;
    }
    entities.assessment.findOne({_id: req.params.assessmentId, userId: req.user.email}, function(err, assessment){
        if (!err && assessment) {
            // find the delete uid in the favorites array
            for (var i = 0; i < assessment.questions.length; i++){
                if (assessment.questions[i].id == req.params.questionId){
                    // remove it from the array.
                    assessment.questions.splice(i, 1);
                }
            }
            // save the doc
            assessment.save(function(err) {
                if (!err) {
                    deferred.resolve("question");
                    return res.send(204);
                } else {
                    return res.send(null, 500);
                }
            });
        } else if (err) {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};