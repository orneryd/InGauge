angular.module('inGuage').controller('TeacherAssessmentDetailCtrl', ["$scope", "$http", "$location", "$routeParams", function ($scope, $http, $location, $routeParams) {
    $scope.assessment = null;
    $scope.newQuestion = {
        text: null,
        answers: []
    };
    
    var getAssessment = function(){
        return $http.get("/api/assessment/" + $routeParams.sessionId).success(function(assessment){
            $scope.assessment = assessment;
        });
    };
    $scope.edit = function(question) {
        //TODO: add editable questions.
    };
    $scope.remove = function(question) {
        $http.delete("/api/assessment/" + $scope.assessment._id + "/question/" + question.id).success(getAssessment);
    };
    
    $scope.createQuestion = function(){
        $http.post("/api/assessment/" + $routeParams.sessionId + "/question", $scope.newQuestion).success(function(){
            $scope.newQuestion = {
                text: null,
                answers: []
            };
            getAssessment();
        });
    };
    $scope.addAnswer = function(){
        $scope.newQuestion.multiChoice = true;
        $scope.newQuestion.answers.push({
            text: null,
            correct: false
        });
    };
    
    getAssessment();
}]);