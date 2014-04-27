'use strict';

angular.module('sweduphxApp').controller('DashboardCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    $scope.poll;
    $scope.assessmentResults;
    $scope.pollNew = {};

    // modes:
    // pollingMode = 0;
    // assesmentMode = 1;
    // resultsMode = 2;
    $scope.mode = 0;

    $scope.states = {
        0: 0,
        1: 0,
        2: 0
    };
    $scope.studentsConnectedCount = 0;
    
    var initialize = function() {

        // Set socket events
        $socket.on('newPollAction', getCurrentPollResults);
        $socket.on('newPoll', getCurrentPoll);
        $socket.on('closePoll', getCurrentPoll);
        $socket.on('newQuestionResult', getCurrentAssessmentResults);
        $socket.on('newFeedbackResult', getCurrentFeedbackResults);

        $scope.$watch('poll', function() {
            // Count all distinct action states
            if ($scope.poll && $scope.poll.actions) {
                var states = {};
                
                $scope.poll.actions.forEach(function(element) {
                    if (!states[element.state]) {
                        states[element.state] = 0;
                    }

                    states[element.state]++;
                });

                $scope.poll.actions.states = states;
            }
        });

        getCurrentPoll().success(getCurrentPollResults);
        getCurrentAssessmentResults();
        $http.get('/api/assessment/active').success(function(assessment){
            if (assessment !== "null"){
                $scope.mode = 2;
                $scope.assessment = assessment;
            }
        });
        $http.get('/api/question').success(function(questions) {
            $scope.questions = questions;
        });
    };

    // Get the current active poll from the server

    
    $scope.startQuestionMode = function(){
        $scope.mode = 1;
    };
    
    $scope.returnToPolling = function(){
        if ($scope.mode === 2){
            $http.put('/api/assessment/' + $scope.assessment._id).success(function(){
                $scope.mode = 0;
                $scope.assessmentResults = null;
            });
        } else {
            $scope.mode = 0;
        }
    };
    
    $scope.selectQuestion = function(q){
        // console.log("show", arguments, this);
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = null;
        }
        q.selected = true;
        $scope.lastSelected = q;
    };
    
    $scope.startAssessment = function(question){
        $http.post('/api/assessment', { question: question }).success(function(assessment){
            $scope.mode = 2;
            $scope.assessment = assessment;
        });
    };

    $scope.feedbackResults;
    
    $scope.startFeedback = function(){
        $http.get('/api/feedback/active').success(function(feedback) {
            if (feedback !== 'null' && feedback) {
                $scope.mode = 3;
                $scope.feedback = feedback;
            } else {
                $http.post('/api/feedback').success(function(feedback){
                    $scope.mode = 3;
                    $scope.feedback = feedback;
                });
            }
        });
    };
    
    $scope.endFeedback = function(){
        $http.put('/api/feedback/' + $scope.feedback._id).success(function(){
            $scope.mode = 0;
        });
    };

    var getCurrentFeedbackResults = function(){
        $http.get('/api/feedback/active').success(function(results) {
            $scope.feedbackResults = results.feedbackResults;
        });
    };
    
    var getCurrentPoll = function(){
        return $http.get('/api/poll/active').success(function(poll) {
            if (poll !== 'null' && poll) {
                $scope.poll = poll;
                $scope.pollNew = {};
                updateFromNow();
            } else {
                $scope.poll = null;
            }
        });
    };
    var getCurrentAssessmentResults = function(){
        $http.get('/api/assessment/active/results').success(function(results) {
            var assessmentResults = {};
            var count = 0;
            for (var key in results) {
                count++;
                var answer = results[key].givenAnswer;
                if (assessmentResults[answer.text]) {
                    assessmentResults[answer.text].responses++;
                } else {
                    assessmentResults[answer.text] = {responses: 1};
                }

                assessmentResults[answer.text].percent = function() {
                    return parseInt(100 * this.responses / count);
                };
            }

            $scope.assessmentResults = assessmentResults;
        });
    };

    var getCurrentPollResults = function() {
        $http.get('api/poll/active/results').success(function(results) {
            var states = {
                0: 0,
                1: 0,
                2: 0
            };
            var studentsConnectedCount = 0;

            if (results) {
                for (var key in results) {
                    var result = results[key];
                    if (typeof states[result.state] === 'number') {
                        states[result.state]++;
                        studentsConnectedCount++;
                    }
                };

                for (key in states) {
                    states[key] = states[key] / studentsConnectedCount || 0;
                }
            }

            $scope.states = states;
            $scope.studentsConnectedCount = studentsConnectedCount;
        });
    };

    // Calculate how long ago started
    var timeout = null;
    var updateFromNow = function() {
        // If called via setTimeout, have to use scope.apply so angular knows
        if ($scope.poll && $scope.poll.start) {
            $scope.poll.momentFromNow = moment($scope.poll.start).fromNow();
        }

        // Call again later
        $timeout.cancel(timeout);
        timeout = $timeout(updateFromNow, 60000);
    };
    
    // Create a new poll
    $scope.startNewPoll = function(){
        $http.post('/api/poll', { title: $scope.pollNew.title }).success(getCurrentPoll);
    };

    // End the current poll
    $scope.endPoll = function(){
        $http.put('/api/poll/' + $scope.poll._id, {}).success(getCurrentPoll);
    };
    
    initialize();
}]);
