'use strict';

var mongoose = require('mongoose'),
    http = require('http'),
    q = require("q"),
    moment = require("moment"),
    logic = require("./logic"),
    entities = {
        question: mongoose.model('question'),
        student: mongoose.model('student'),
        poll: mongoose.model('poll'),
        assessment: mongoose.model('assessment'),
        feedback: mongoose.model('feedback')
    };
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

exports.getActive = function(req, res) {
    var type = req.params.type.toLowerCase();
    entities[type].findOne({ end: null }, function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    });
};

exports.getResults = function(req, res) {
    var type = req.params.type.toLowerCase();
    entities[type].findOne({ _id: req.params.id }, function(err, entity) {
        if (!err) {
            return res.json(logic.convertToResults(entity));
        } else {
            return res.send(err);
        }
    });
};
exports.getActiveResults = function(req, res) {
    var type = req.params.type.toLowerCase();
    entities[type].findOne({ end: null }, function(err, entity) {
        if (!err) {
            return res.json(logic.convertToResults(entity));
        } else {
            return res.send(err);
        }
    });
};

exports.post = function(req, res) {
    var type = req.params.type.toLowerCase();
    var deferred = q.defer();
    req.body.start = moment.utc();
    entities[type].create(req.body, function(err, entity){
        if (!err) {
            deferred.resolve(type, entity._id);
            return res.send(201, entity);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.postResult = function(req, res) {
    var type = req.params.type.toLowerCase();
    var deferred = q.defer();
    req.body.created = moment.utc();
    entities[type].update({
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
            deferred.resolve(type + "Result", "active");
            return res.send(200);
        } else {
            deferred.reject(err);
            return res.send(err);
        }
    });
    return deferred.promise;
};

exports.put = function(req, res) {
    var type = req.params.type.toLowerCase();
    var deferred = q.defer();
    entities[type].findOne({_id: req.params.id}, function(err, entity){
        if (err) { return next(err); }
        entity.end = moment.utc();
        entity.save(function(err) {
            if (!err) {
                deferred.resolve(type, entity._id);
                return res.send(204);
            } else {
                deferred.reject(err);
                return next(err);
            }
        });
    });
    return deferred.promise;
};

