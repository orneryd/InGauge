'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    util = require('util'),
    authApi = require('./controllers/authApi')

/*
 * Application routes
 */
module.exports = function(app, socketsApi){
    // Server API Routes

    /* Auth and Registrations route */
    app.post('/auth', authApi.auth);
    app.post('/register', authApi.register);
    app.post('/join', authApi.join);

    /* Base methods */
    /* GET methods */

    app.get('/api/assessment/:assessmentId/questions', api.getQuestions);
    
    /* returns all associated with your account */
    app.get('/api/:type', api.get);
    
    /* returns by id associated with your account */
    app.get('/api/:type/:id', api.get);

    app.get('/api/session/:sessionId/:type', api.get);
    app.get('/api/session/:sessionId/:type/:id', api.get);

    /* POST methods */
    app.post('/api/session',function(req, res){
        api.postSession(req, res).done(socketsApi.created);
    });
    
    app.post('/api/:type',function(req, res){
        api.post(req, res).done(socketsApi.created);
    });
    app.post('/api/:type/:id/start', function(req, res){
        api.start(req, res).done(socketsApi.started);
    });
    app.post('/api/:type/:id/end', function(req, res){
        api.end(req, res).done(socketsApi.ended);
    });
    // helper so the api seems more explicit.
    app.post('/api/session/:sessionId/:type',function(req, res){
        api.post(req, res).done(socketsApi.created);
    });

    /* DELETE methods */
    app.delete('/api/:type/:id', function(req, res){
        api.delete(req, res).done(socketsApi.closed)
    });
    
    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res){
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};