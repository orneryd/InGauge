angular.module('inGuage').controller('StudentAssessmentCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", "$location", function ($scope, $http, $io, $timeout, $routeParams, $location) {
    $scope.assessment = null;
    
    $scope.currentQuestion = null;
    $scope.currentQuestionIndex = null;

    $io.on("assessmentClosed", function(){
        $location.path("/student/session" + $routeParams.sessionId)
    });

    $scope.selectAnswer = function(answer) {
        $scope.selectedAnswer = answer;
    };

    $scope.submitAnswer = function(answer) {
        var assessmentResult = { 
            questionId: $scope.currentQuestion.id,
            student: "",
            result: answer 
        };
        $http.post('/api/session/' + $routeParams.sessionId + "/assessmentResult", assessmentResult).success(function(){
            $scope.assessment = null;
        });
    };
    
    $http.get('/api/assessmentInstance/' + $routeParams.assessmentId).success(function(assessment) {
        $scope.assessment = assessment;
    });
}]);
