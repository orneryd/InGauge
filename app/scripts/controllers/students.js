'use strict';

angular.module('sweduphxApp').controller('StudentsCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    var waiting, waiting2;
    $scope.currentStudent = null;
    
    $scope.currentPoll = null;
    $scope.currentPoll = {
        student: {
            name: null
        },
        state: null
    };
    var getCurrentPoll = function(){
      $http.get('/api/poll/active').success(function(poll) {
        if (poll !== 'null') {
          $scope.currentPoll = poll;
        }
      });
    };
    var startWaiting = function(){
        $scope.disableClick = true;
        waiting = $timeout(function(){
            $scope.currentState = "cruise control.";
        }, 3000);
        waiting2 = $timeout(function(){
            $scope.disableClick = false;
        }, 1000);
    };
    $scope.selectStudent = function(student){
      $scope.currentStudent = student;
      getCurrentPoll()
    };
    
    $scope.sendAction = function(state){
        if (waiting){
            clearTimeout(waiting);
            clearTimeout(waiting2);
            waiting = null;
            waiting2 = null;
        }
        $http.post('/api/action/' + $scope.currentPoll._id).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };
    
    $scope.$watch("currentPollResult.state", function(wut){
        if ($scope.currentPoll) {
            $http.post('/api/pollResult/' + $scope.currentPoll._id, {student: $scope.currentStudent, state: wut}).success(function() {
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
