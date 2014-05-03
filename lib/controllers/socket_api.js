'use strict';

/**
 * Application routes
 */
module.exports = function(app, server, channel){

    channel.sockets.on('connection', function(socket){
        
    });
    var api = {
        created: function(type, id){
            channel.sockets.emit(type + 'Created', {id: id});
        },
        closed: function(type, id){
            channel.sockets.emit(type + 'Closed',  {id: id});
        },
        started: function(type, id){
            channel.sockets.emit(type + 'Started',  {id: id});
        }
    };
    return api;
};