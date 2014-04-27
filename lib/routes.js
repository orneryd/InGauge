'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/*
 * Application routes
 */
module.exports = function(app, socketsApi){
    // Server API Routes
    /* GET methods */
    app.get('/api/poll/active', function(req, res){
        api.getActivePoll(req, res);
    });
    app.get('/api/poll/active/results', function(req, res){
        api.getCurrentPollResults(req, res);
    });
    app.get('/api/assessment/active', function(req, res){
        api.getActiveAssessment(req, res);
    });
    app.get('/api/assessment/active/results', function(req, res){
        api.getCurrentAssessmentResults(req, res);
    });
    app.get('/api/feedback/active', function(req, res){
        api.getActiveFeedback(req, res);
    });
    app.get('/api/feedback/active/results', function(req, res){
        api.getCurrentFeedbackResults(req, res);
    });
    app.get('/api/:type', api.get);
    app.get('/api/:type/:id', api.get);
    
    /* POST methods */
    app.post('/api/poll', function(req, res){
        api.createPolls(req, res).done(socketsApi.newPoll);
    });
    app.post('/api/action/:id', function(req, res){
        api.postPollAction(req, res).done(socketsApi.newPollAction);
    });
    app.post('/api/student', function(req, res){
        api.postStudents(req, res).done(socketsApi.newStudent);
    });
    app.post('/api/assessment', function(req, res){
        api.postAssessment(req, res).done(socketsApi.newAssessment);
    });
    app.post('/api/questionResult/:id', function(req, res){
        api.postQuestionResult(req, res).done(socketsApi.newQuestionResult);
    });
    app.post('/api/feedback', function(req, res){
        api.postFeedback(req, res).done(socketsApi.newFeedback);
    });
    app.post('/api/feedbackResult/:id', function(req, res){
        api.postFeedbackResult(req, res).done(socketsApi.newFeedbackResult);
    });
    
    /*PUT methods */
    app.put('/api/poll/:id', function(req, res){
        api.updatePolls(req, res).done(socketsApi.closePoll);
    });
    app.put('/api/assessment/:id', function(req, res){
        api.updateAssessment(req, res).done(socketsApi.closeAssessment);
    });
    app.put('/api/feedback/:id', function(req, res){
        api.updateFeedback(req, res).done(socketsApi.closeFeedback);
    });

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res){
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', index.index);
};