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
        closeAssessment: function(){
            channel.sockets.emit('closeAssessment');
        },
        closeFeedback: function(){
            channel.sockets.emit('closeFeedback');
        },
        newPollAction: function(){
            channel.sockets.emit('newPollAction');
        },
        newStudent: function(){
            channel.sockets.emit('newStudent');
        },
        newAssessment: function(){
            channel.sockets.emit('newAssessment');
        },
        newFeedback: function(){
            channel.sockets.emit('newFeedback');
        },
        newFeedbackResult: function(){
            channel.sockets.emit('newFeedbackResult');
        }
    };
    return api;
};