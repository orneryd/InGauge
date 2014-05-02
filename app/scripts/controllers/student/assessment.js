angular.module('inGuage').controller('StudentIndexCtrl', ["$scope", "$http", "$io", "$timeout", function ($scope, $http, $io, $timeout) {
    var resetState, resetButtons;
    $scope.assessment = null;
    $scope.assessmentAnswerSelectedId = null;

    $scope.message = '';

    var init = function(){


        $io.on("sessionClosed", function(){
            $scope.mode = 0;
            $scope.currentSession = null;
        });

        $io.on('assessmentCreated', getCurrentAssessment);
        $io.on('assessmentClosed', function(){
            $scope.mode = $scope.currentSession ? 1 :0;
        });

        $io.on('feedbackCreated', getCurrentFeedback);

        $io.on('studentCreated', function(){
            $http.get('/api/student').success(function(students) {
                $scope.students = students;
            });
        });
        $http.get('/api/student').success(function(students) {
            $scope.students = students;
        });
    };
    var getCurrentSession = function(){
        return $http.get('/api/session/active').success(function(session) {
            if (session !== 'null') {
                $scope.currentSession = session;
                $scope.mode = 1;
                $http.post('/api/session/' + $scope.currentSession._id, { student: $scope.currentStudent, state: 0 });
            }
        });
    };

    var getCurrentAssessment = function(){
        $http.get('/api/assessment/active').success(function(assessment) {
            if (assessment === 'null') return;
            var hasAnswered = false;
            if (assessment.results){
                angular.forEach(assessment.results, function(item){
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
            $http.post('/api/session/' + $scope.currentSession._id, { student: $scope.currentStudent, state: 0 });
        }, 5000);
        resetButtons = $timeout(function(){
            $scope.disableClick = false;
        }, 2000);
    };

    // Update the mode based on existing data in order of priority
    var updateMode = function() {
        // session
        if ($scope.currentSession) {
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
        getCurrentSession().success(getCurrentAssessment).error(getCurrentAssessment);
    };

    $scope.sendAction = function(state){
        if (resetState){
            $timeout.cancel(resetState);
            $timeout.cancel(resetButtons);
            resetState = null;
            resetButtons = null;
        }
        $http.post('/api/session/' + $scope.currentSession._id, { student: $scope.currentStudent, state: state }).success(function(){
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
