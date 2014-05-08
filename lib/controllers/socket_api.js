'use strict';

/**
 * Application routes
 */
module.exports = function(app, server, channel){

    channel.sockets.on('connection', function(socket){
        
    });
    var api = {
        created: function(type, id){
            channel.sockets.emit(type + 'created', {id: id});
        },
        ended: function(type, id){
            channel.sockets.emit(type + 'ended',  {id: id});
        },
        started: function(type, id){
            channel.sockets.emit(type + 'started',  {id: id});
        }
    };
    return api;
};