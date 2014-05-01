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
        student: mongoose.model('student'),
        poll: mongoose.model('poll'),
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
    users.findOne({ username: req.body.username}, function(err, user) {
        console.log(req.body);
        console.log(user);
        if (err){
            return res.send(401, 'wrong username or password');
        }
        var isValid = passwordHash.verify(req.body.password, user.passwordHash);
        if (isValid){
            // We are sending the profile inside the token
            var token = jwt.sign({
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.username,
                id: user._id
            }, "shivakaminisomakandarkram", { expiresInMinutes: 60*5 });
            return res.json({ token: token });
        } else {
            return res.send(401, 'wrong username or password');
        }
    });
};

exports.registerUser = function(req, res) {
    users.findOne({ username: req.body.username}, function(err, user){
        if (err || user){
            return res.send(400, "user already exists.");
        } else {
            users.create({
                username: req.body.username,
                passwordHash: passwordHash.generate(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                accountId: uuid.v1()
            }, function(err, user) {
                // We are sending the profile inside the token
                var token = jwt.sign({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.username,
                    id: user._id
                }, "shivakaminisomakandarkram", { expiresInMinutes: 60*5 });
                return res.json({ token: token });
            });
        }
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
        type.findOne({_id: req.params.id}, callback);
    } else {
        type.find(callback);
    }
};

exports.getActive = function(req, res) {
    var type = getSupportedType(req, res);
    if (!type) return;
    type.findOne({ end: null }, function(err, results) {
        if (!err) {
            return res.json(results);
        } else {
            return res.send(err);
        }
    });
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
exports.getActiveResults = function(req, res) {
    var type = getSupportedType(req, res);
    if (!type) return;
    type.findOne({ end: null }, function(err, entity) {
        if (!err) {
            return res.json(logic.convertToResults(entity));
        } else {
            return res.send(err);
        }
    });
};

exports.post = function(req, res) {
    var type = getSupportedType(req, res);
    if (!type) return;
    var deferred = q.defer();
    req.body.start = moment.utc();
    type.create(req.body, function(err, entity){
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
    var type = getSupportedType(req, res);
    if (!type) return;
    var deferred = q.defer();
    req.body.created = moment.utc();
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
    var type = getSupportedType(req, res);
    if (!type) return;
    var deferred = q.defer();
    type.findOne({_id: req.params.id}, function(err, entity){
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

