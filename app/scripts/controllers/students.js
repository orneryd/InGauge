'use strict';

angular.module('inGuage').controller('StudentsCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    var resetState, resetButtons;
    $scope.currentStudent = null;
    
    $scope.currentPoll = null;
    $scope.mode = 0;
    // cruise control
    // 1 = slow down
    // 2 = speed up
    $scope.currentState = 0;
    $scope.feedback = null;
    $scope.assessment = null;
    $scope.assessmentAnswerSelectedId = null;

    $scope.message = '';

    var init = function(){
        $socket.on("pollCreated", function(){
            $http.get('/api/poll/active').success(function(poll) {
                $scope.mode = 1;
                $scope.currentPoll = poll;
            });
        });

        $socket.on("pollClosed", function(){
            $scope.mode = 0;
            $scope.currentPoll = null;
        });

        $socket.on('assessmentCreated', getCurrentAssessment);
        $socket.on('assessmentClosed', function(){
            $scope.mode = $scope.currentPoll ? 1 :0;
        });

        $socket.on('feedbackCreated', getCurrentFeedback);

        $socket.on('studentCreated', function(){
            $http.get('/api/student').success(function(students) {
                $scope.students = students;
            });
        });
        $http.get('/api/student').success(function(students) {
            $scope.students = students;
        });
    };
    var getCurrentPoll = function(){
      return $http.get('/api/poll/active').success(function(poll) {
        if (poll !== 'null') {
            $scope.currentPoll = poll;
            $scope.mode = 1;
            $http.post('/api/poll/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: 0 });
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
            if (!hasAnswered && assessment){
                $scope.mode = 2;
                $scope.assessment = assessment;
            }
        });
    };

    var getCurrentFeedback = function() {
        $http.get('/api/feedback/active').success(function(feedback) {
            if (feedback !== 'null' && feedback) {
                $scope.feedback = feedback;
                $scope.mode = 3;
            }
        });
    };

    var startWaiting = function(){
        $scope.disableClick = true;
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/poll/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: 0 });
        }, 5000);
        resetButtons = $timeout(function(){
            $scope.disableClick = false;
        }, 2000);
    };

    // Update the mode based on existing data in order of priority
    var updateMode = function() {
        // Poll
        if ($scope.currentPoll) {
            $scope.mode = 1;

        // Assessment
        } else if ($scope.assessment) {
            $scope.mode = 2;

        // Feedback 
        } else if ($scope.feedback) {
            $scope.mode = 3;
        // Waiting
        } else {
            $scope.mode = 0;
        }
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
        $http.post('/api/poll/' + $scope.currentPoll._id, { student: $scope.currentStudent, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };
    $scope.assessmentAnswerSelect = function(answer) {
        $scope.assessmentAnswerSelected = answer;
    };

    $scope.assessmentAnswerSubmit = function(answer) {
        $http.post('/api/assessment/' + $scope.assessment._id, { student: $scope.currentStudent, givenAnswer: answer }).success(function(){
            $scope.assessment = null;
            updateMode();
        });
    };
    
    $scope.messageSubmit = function(message) {
        $http.post('/api/feedback/' + $scope.feedback._id, { student: $scope.currentStudent, text: message }).success(function(){
            $scope.feedback = null;
            updateMode();
        });
    };
    
//    $scope.testResults = [];

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
    init();
}]);
