'use strict';

/**
 * Application routes
 */
module.exports = function(app, server, channel){

    channel.sockets.on('connection', function(socket){
        
    });
    var api = {
        created: function(args){
            console.log(args.type + " : " + args.id);
            channel.sockets.emit(args.type + 'created', args.id );
        },
        ended: function(args){
            console.log(args.type + " : " + args.id);
            channel.sockets.emit(args.type + 'ended', args.id);
        },
        started: function(args){
            console.log(args.type + " : " + args.id);
            channel.sockets.emit(args.type + 'started', args.id);
        }
    };
    return api;
};