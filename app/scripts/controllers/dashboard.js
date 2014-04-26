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
    
    var initialize = function() {

        // Set socket events
        $socket.on('newPollAction', getCurrentPollResults);
        $socket.on('newPoll', getCurrentPoll);
        $socket.on('closePoll', getCurrentPoll);
        $socket.on('newQuestionResult', getCurrentAssessmentResults);

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

        getCurrentPoll();
        getCurrentPollResults();
        
        $http.get('/api/question').success(function(questions) {
            $scope.questions = questions;
        });
    };

    // Get the current active poll from the server

    
    $scope.startQuestionMode = function(){
        $scope.mode = 1;
    };
    
    $scope.returnToPolling = function(){
        if ($scope.assessmentResults){
            $http.put('/api/assessment/' + $scope.assessmentResults._id).success(function(){
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
    
    $scope.pushQuestion = function(question){
        $http.post('/api/assessment', { question: question }).success(function(){
            $scope.mode = 2;
        });
    };
    var getCurrentPoll = function(){
        $http.get('/api/poll/active').success(function(poll) {
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
            $scope.assessmentResults = results;
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

    /*
    $scope.testResults = [];
        $http.get('/api/student').success(function(students) {
            $scope.students = students;
        });
        $http.get('/api/testresult').success(function(results) {
            $scope.testResults = results;
        });
        $scope.testResultsFor = function (name){
            return $scope.testResults.filter(function(item){
                return item.student === name
                    && !!item.endTime;
            });
        };
        $scope.hasTestsInProgress = function (name){
            return $scope.testResults.filter(function(item){
                return item.student === name
                    && !item.endTime;
            }).length > 0;
        };
        $scope.testResultsInProgressFor = function (name){
            return $scope.testResults.filter(function(item){
                return item.student === name
                    && !item.endTime;
            });
        };
        $socket.on('newTestResult', function () {
            $http.get('/api/testresult').success(function(results) {
                $scope.testResults = results;
            });
        });
        $socket.on('newQuestionResult', function () {
            $http.get('/api/testresult').success(function(results) {
                $scope.testResults = results;
            });
        });
        $scope.percentCorrect = function(test){
            var totalCorrect = 0;
            angular.forEach(test.questionResults, function(item){
                if (item.givenAnswer.correct){
                    totalCorrect++
                }
            });
            return Math.round(totalCorrect * 100.0/test.questionResults.length);
        }*/
}]);
