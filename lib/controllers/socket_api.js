'use strict';

/**
 * Application routes
 */
module.exports = function(app, server, channel){

    channel.sockets.on('connection', function(socket){
        
    });
    var api = {
        created: function(type, id){
            channel.sockets.emit(type + 'Created', id);
        },
        closed: function(type, id){
            channel.sockets.emit(type + 'Closed', id);
        }
    };
    return api;
};