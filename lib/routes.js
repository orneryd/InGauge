'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/*
 * Application routes
 */
module.exports = function(app, socketsApi){
    // Server API Routes
    /* GET methods */
    app.get('/api/:type', api.get);
    app.get('/api/:type/:id', api.get);
    
    /* POST methods */
    app.post('/api/question', function(req, res){
        api.postQuestions(req, res).done(socketsApi.newQuestion);
    });
    app.post('/api/test', function(req, res){
        api.postQuestions(req, res).done(socketsApi.newTest);
    });
    app.post('/api/testresult', function(req, res){
        api.createTestResults(req, res).done(socketsApi.newTestResult);
    });
    app.post('/api/testresult/:testResultId', function(req, res){
        api.updateTestResults(req, res).done(socketsApi.newTestResult);
    });
    app.post('/api/testresult/:testResultId/questionresult', function(req, res){
        api.postQuestionResult(req, res).done(socketsApi.newQuestionResult);
    });
    app.post('/api/student', function(req, res){
        api.postStudents(req, res).done(socketsApi.newStudent);
    });

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res){
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};