'use strict';

angular.module('sweduphxApp').controller('StudentsCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    var resetState, resetButtons;
    $scope.currentStudent = null;
    
    $scope.currentPoll = null;
    $scope.mode = 0;
    // cruise control
    // 1 = slow down
    // 2 = speed up
    $scope.currentState = 0;

    $scope.assessment = null;
    $scope.assessmentAnswerSelectedId = null;

    var getCurrentPoll = function(){
      return $http.get('/api/poll/active').success(function(poll) {
        if (poll !== 'null') {
            $scope.currentPoll = poll;
            $scope.mode = 1;
            $http.post('/api/action/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: 0 });
        }
      });
    };

    var getCurrentAssessment = function(){
        $http.get('/api/assessment/active').success(function(assessment) {
            if (assessment === 'null') return;
            var hasAnswered = false;
            if (assessment.questionResults){
                angular.forEach(assessment.questionResults, function(item){
                    if (item.student.name === $scope.currentStudent.name) {
                        hasAnswered = true;
                    }
                });
            }
            if (!hasAnswered){
                $scope.mode = 2;
                $scope.assessment = assessment;
            }
        });
    };

    var startWaiting = function(){
        $scope.disableClick = true;
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/action/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: 0 });
        }, 3000);
        resetButtons = $timeout(function(){
            $scope.disableClick = false;
        }, 1000);
    };
    $scope.selectStudent = function(student){
        $scope.currentStudent = student;
        getCurrentPoll().success(getCurrentAssessment).error(getCurrentAssessment);
    };
    
    $scope.sendAction = function(state){
        if (resetState){
            $timeout.cancel(resetState);
            $timeout.cancel(resetButtons);
            resetState = null;
            resetButtons = null;
        }
        $http.post('/api/action/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };
    $scope.assessmentAnswerSelect = function(answer) {
        $scope.assessmentAnswerSelected = answer;
    };

    $scope.assessmentAnswerSubmit = function(answer) {
        $http.post('/api/questionResult/' + $scope.assessment._id, { student: $scope.currentStudent, givenAnswer: answer }).success(function(){
            //need results for student
            $scope.mode = $scope.currentPoll ? 1 : 0;
        });
    };
    
    $socket.on("newPoll", function(){
        $http.get('/api/poll/active').success(function(poll) {
            $scope.mode = 1;
            $scope.currentPoll = poll;
        });
    });
    
    $socket.on("closePoll", function(){
        $scope.mode = 0;
        $scope.currentPoll = null;
    });

    $socket.on('newAssessment', getCurrentAssessment);
    $socket.on('closeAssessment', function(){
        $scope.mode = $scope.currentPoll ? 1 :0;
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
