'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    util = require('util');

/*
 * Application routes
 */
module.exports = function(app, socketsApi){
    // Server API Routes

    /* Auth and Registrations route */
    app.post('/auth', api.authUser);
    app.post('/register', api.registerUser);
    
    /* Base methods */
    /* GET methods */
    app.get('/api/:type', api.get);
    app.get('/api/:type/active', api.getActive);
    app.get('/api/:type/active/results', api.getActiveResults);
    app.get('/api/:type/:id', api.get);
    app.get('/api/:type/:id/results', api.getResults);

    /* POST methods */
    app.post('/api/:type', function(req, res){
        api.post(req, res).done(socketsApi.created);
    });
    app.post('/api/:type/:id',function(req, res){
        api.postResult(req, res).done(socketsApi.created);
    }); 

    /*PUT methods */
    app.put('/api/:type/:id', function(req, res){
        api.put(req, res).done(socketsApi.closed)
    });

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res){
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};