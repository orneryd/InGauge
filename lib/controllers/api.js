'use strict';

var mongoose = require('mongoose'),
    http = require('http'),
    q = require("q"),
    moment = require("moment"),
    entities = {
        assessment: mongoose.model('assessment'),
        assessmentresult: mongoose.model('assessmentResult'),
        assessmentinstance: mongoose.model('assessmentInstance'),
        feedback: mongoose.model('feedback'),
        feedbackresult: mongoose.model('feedbackResult'),
        question: mongoose.model('question'),
        session: mongoose.model('session'),
        sessionresult: mongoose.model('sessionResult')
    };

/**
 * Get awesome things
 */

function _getSupportedType(req, res){
    var type = req.params.type.toLowerCase();
    if (!entities[type]){
        res.send(404, "type not supported");
        return null;
    }
    return entities[type];
}

var _getQuery = function(req){
    var query = {
        accountId: req.user.accountId,
        userId: req.user.userId
    };
    if (req.params.sessionId){
        query.sessionId = req.params.sessionId;
    }
    if (req.params.id){
        query._id = req.params.id;
    }
    return query;
};

var get = function(req, res) {
    var type = _getSupportedType(req, res);
    if (!type) return;
    var method = req.params.id ? "findOne" : "find";
    var foo = _getQuery(req, res);
    type[method](foo, function(err, results) {
        if (!err) {
            return res.json({ results: results });
        } else {
            return res.send({ error: err });
        }
    });
};

var getQuestions = function(req, res) {
    var foo = _getQuery(req, res);
    foo.assessmentId = req.params.assessmentId;
    console.log(foo);
    entities.question.find(foo, function(err, results) {
        if (!err) {
            return res.json({ results: results });
        } else {
            return res.send({ error: err });
        }
    });
};

var post = function(req, res) {
    var deferred = q.defer();
    var type = _getSupportedType(req, res);
    req.body.accountId = req.user.accountId;
    req.body.userId = req.user.userId;
    if (req.params.sessionId){
        req.body.sessionId = req.params.sessionId;
    }
    type.create(req.body, function(err, entity){
        if (!err) {
            deferred.resolve({type: req.params.type.toLowerCase(), id: entity._id});
            return res.send(201, entity._id);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

var postSession = function(req, res){
    var deferred = q.defer();
    req.body.userId = req.user.userId;    
    req.body.accountId = req.user.accountId;
    req.body.code = Math.random().toString(36).slice(12);
    entities.session.create(req.body, function(err, session){
        if (!err) {
            deferred.resolve({type: "session", id: session._id});
            return res.send(201, session._id);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

var _save = function(entity, type, deferred, res){
    var id =  entity._id;
    console.log("Saving: " + id);
    entity.save(function(err) {
        if (!err) {
            deferred.resolve({type: type.toLowerCase(), id: id});
            return res.send(204);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
};

var start = function(req, res) {
    var deferred = q.defer();
    var type = _getSupportedType(req, res);
    type.findOne(_getQuery(req, res), function(err, entity){
        if (err) { return res.send(err); }
        entity.start = moment.utc();
        _save(entity, req.params.type, deferred, res);
    });
    return deferred.promise;
};

var end = function(req, res) {
    var deferred = q.defer();
    var type = _getSupportedType(req, res);
    type.findOne(_getQuery(req, res), function(err, entity){
        if (err) { return res.send(err); }
        entity.end = moment.utc();
        _save(entity, req.params.type, deferred, res);
    });
    return deferred.promise;
};

var del = function(req, res) {
    var deferred = q.defer();
    var type = _getSupportedType(req, res);
    if (req.user.type == 0 || !type){
        return res.send(401);
    }
    type.remove({_id: req.params.id}, function(err){
        if (!err) {
            deferred.resolve(req.params.type);
            return res.send(204);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};


exports.get = get;
exports.getQuestions = getQuestions;
exports.post = post;
exports.postSession = postSession;
exports.start = start;
exports.end = end;
exports.delete = del;
