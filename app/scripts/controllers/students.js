'use strict';

angular.module('sweduphxApp').controller('StudentsCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    var waiting, waiting2;
    $scope.currentStudent = null;
    
    $scope.currentPoll = null;
    
    // cruise control
    // 1 = slow down
    // 2 = speed up
    $scope.currentState = 0;

    var getCurrentPoll = function(){
      $http.get('/api/poll/active').success(function(poll) {
        if (poll !== 'null') {
            $scope.currentPoll = poll;
            $http.post('/api/action/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: 0 });
        }
      });
    };
    var startWaiting = function(){
        $scope.disableClick = true;
        waiting = $timeout(function(){
            $scope.currentState = 0;
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
            $timeout.cancel(waiting);
            $timeout.cancel(waiting2);
            waiting = null;
            waiting2 = null;
        }
        $http.post('/api/action/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };
    
    $socket.on("newPoll", function(){
        $http.get('/api/poll/active').success(function(poll) {
            $scope.currentPoll = poll;
        });
    });
    
    $socket.on("closePoll", function(){
        $scope.currentPoll = null;
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
