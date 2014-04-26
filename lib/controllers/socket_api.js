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
        newPoll: function(){
            channel.sockets.emit('newPoll');
        },
        newPollResult: function(){
            channel.sockets.emit('newPollResult');
        },
        newStudent: function(){
            channel.sockets.emit('newStudent');
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