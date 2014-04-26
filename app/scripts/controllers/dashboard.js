'use strict';

angular.module('sweduphxApp').controller('DashboardCtrl', ["$scope", "$http", "$socket", function ($scope, $http, $socket) {
    $scope.poll;
    
    var getCurrentPoll = function(pollId){
        $http.get('/api/poll/' + pollId).success(function(poll) {
            $scope.poll = poll;
        });
    };
    
    $scope.startNewPoll = function(){
        $http.post('/api/poll', { pollStart: moment() }).success(getCurrentPoll);
    };
    
    $socket.on('newPollResult', getCurrentPoll);


    /*    $scope.testResults = [];
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
