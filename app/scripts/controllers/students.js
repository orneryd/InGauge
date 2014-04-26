'use strict';

angular.module('sweduphxApp').controller('StudentsCtrl', ["$scope", "$http", "$socket", function ($scope, $http, $socket) {
    $scope.currentStudent = null;
    
    $scope.currentPoll = null;

    var getCurrentPoll = function(){
      $http.get('/api/poll/active').success(function(poll) {
        if (poll !== 'null') {
          $scope.poll = poll;
        }
      });
    };

    $scope.selectStudent = function(student){
      $scope.currentStudent = student;
      getCurrentPoll()
    };
    
    $scope.currentPollResult = {
        student: {
            name: null
        },
        state: null
    };
    
    $scope.$watch("currentPollResult.state", function(wut){
        if ($scope.currentPoll) {
            $http.post('/api/pollResult/' + $scope.currentPoll._id, $scope.currentPollResult).success(function() {
                // do nothing?
            });
        }
    });
    
    $socket.on("newPoll", function(pollId){
        $http.get('/api/poll/' + pollId).success(function(poll) {
            $scope.currentPoll = poll;
        });
    });
    
//    $scope.testResults = [];
    $http.get('/api/student').success(function(students) {
        $scope.students = students;
    });
    $scope.newStudent = {
        name: null
    };
    $scope.addStudent = function(){
        if ($scope.newStudent.name){
            $http.post('/api/student', $scope.newStudent).success(function() {
                $scope.newStudent.name = null;
            });
        }
    };
    $socket.on('newStudent', function(){
        $http.get('/api/student').success(function(students) {
            $scope.students = students;
        });
    });
}]);
