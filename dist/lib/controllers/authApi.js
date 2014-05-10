'use strict';

var mongoose = require('mongoose'),
    logic = require("./logic"),
    jwt = require('jsonwebtoken'),
    passwordHash = require('password-hash'),
    uuid = require('node-uuid'),
    users = mongoose.model('user'),
    sessions = mongoose.model('session');

/* Authentication */

exports.auth = function(req, res) {
    users.findOne({ _id: req.body.username.toLowerCase()}, function(err, user) {
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
                userId: user._id,
                accountId: user.accountId
            }, "shivakaminisomakandarkram", { expiresInMinutes: 999999 });
            return res.json({ token: token });
        } else {
            return res.send(401, 'wrong username or password');
        }
    });
};

exports.register = function(req, res) {
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
                    userId: user._id,
                    accountId: user.accountId
                }, "shivakaminisomakandarkram", { expiresInMinutes: 999999 });
                return res.json({ token: token });
            });
        }
    });
};

exports.join = function(req, res) {
    sessions.findOne({ code: req.body.code.toUpperCase(), end: null}, function(err, session) {
        if (err || !session){
            return res.send(401, 'Invalid session code');
        }
        // We are sending the profile inside the token
        var token = jwt.sign({
            type: 0,
            session: session.code,
            sessionId: session._id,
            student: req.body.student,
            userId: session.userId,
            accountId: session.accountId
        }, "shivakaminisomakandarkram", { expiresInMinutes: 60 });
        return res.json({ token: token, sessionId: session._id });
    });
};
