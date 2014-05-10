'use strict';

/**
 * Application routes
 */
module.exports = function(app, server, io){

    io.sockets.on('connection', function(socket){
        socket.on('subscribe', function(sessionId) { 
            socket.join(sessionId); 
        });
        socket.on('unsubscribe', function(sessionId) { 
            socket.leave(sessionId); 
        });
    });
    var api = {
        created: function(data){
            if (data.sessionId) {
                io.sockets.in(data.sessionId).emit(data.type + ':created', data.id);
            } else {
                io.sockets.emit(data.type + 'created', data.id );
            }
        },
        ended: function(data){
            if (data.sessionId) {
                io.sockets.in(data.sessionId).emit(data.type + ':ended', data.id);
            } else {
                io.sockets.emit(data.type + 'ended', data.id);
            }
        },
        started: function(data){
            if (data.sessionId) {
                io.sockets.in(data.sessionId).emit(data.type + ':started', data.id);
            } else {
                io.sockets.emit(data.type + 'started', data.id);
            }
        }
    };
    return api;
};