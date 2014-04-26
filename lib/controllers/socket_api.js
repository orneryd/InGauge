'use strict';

var http = require('http'),
    io = require('socket.io');

/**
 * Application routes
 */
module.exports = function(app){
    var server = http.createServer(app);
    var channel = io.listen(server);
    server.listen(9001);
    channel.sockets.on('connection', function(socket){
        
    });
    var api = {
        newQuestionResult: function(){
            channel.sockets.emit('newQuestionResult');
        },
        newPoll: function(){
            channel.sockets.emit('newPoll');
        },
        closePoll: function(){
            channel.sockets.emit('closePoll');
        },
        newPollAction: function(){
            channel.sockets.emit('newPollAction');
        },
        newStudent: function(){
            channel.sockets.emit('newStudent');
        },
        newAssessment: function(){
            channel.sockets.emit('newAssessment');
        }
        
/*        newQuestionResult: function(student, test){
            channel.sockets.emit('newQuestionResult', { studentName: student, testName: test });
        },
        newTestResult: function(student, test){
            channel.sockets.emit('newTestResult', { studentName: student, testName: test });
        },
        newQuestion: function(){
            channel.sockets.emit('newQuestion');
        },
        newStudent: function(){
            channel.sockets.emit('newStudent');
        },
        newTest: function(){
            channel.sockets.emit('newTest');
        }*/
    };
    return api;
};