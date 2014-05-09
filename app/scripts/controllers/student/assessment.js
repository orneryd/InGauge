angular.module('inGuage').controller('StudentAssessmentCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", "$location", "$identity",
function ($scope, $http, $io, $timeout, $routeParams, $location, $identity) {
    $scope.assessment = null;
    
    $scope.currentQuestion = null;
    $scope.currentQuestionIndex = 0;
    $scope.noMoreQuestions = false;

    var getNextQuestion = function(){
        if ($scope.currentQuestionIndex < $scope.questions.length){
            $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex++];
        } else {
            $scope.noMoreQuestions = true;
        }
    };
    $io.on("assessmentinstanceedned", function(){
        $location.path("/student/session/" + $routeParams.sessionId)
    });
 
    $scope.isSelected = function(ans){
        return $scope.selectedAnswer == ans;
    };
    
    $scope.selectAnswer = function(answer) {
        $scope.selectedAnswer = answer;
    };
    $scope.buttonText = function(){
        return $scope.noMoreQuestions ? "Return" : "Next";
    };

    $scope.submitAnswer = function() {
        if ($scope.noMoreQuestions) {
            $location.path("/student/session/" + $routeParams.sessionId);
            return;
        }
        var assessmentResult = { 
            assessmentId: $routeParams.assessmentId,
            questionId: $scope.currentQuestion.id,
            student: $identity.getFullName(),
            result: $scope.selectedAnswer 
        };
        $http.post('/api/session/' + $routeParams.sessionId + "/assessmentResult", assessmentResult).success(function(){
            getNextQuestion();
        });
    };
    
    $http.get('/api/assessmentInstance/' + $routeParams.assessmentId).success(function(res) {
        $scope.assessment = res.results;
        $http.get('/api/assessment/' + $scope.assessment.assessmentId + "/questions").success(function(res) {
            $scope.questions = res.results;
            getNextQuestion();
        });
    });
}]);
