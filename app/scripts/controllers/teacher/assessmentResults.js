angular.module('inGuage').controller('TeacherAssessmentResultsCtrl', ["$scope", "$http", "$io", "$routeParams", "$location", 
function ($scope, $http, $io, $routeParams, $location) {
    $scope.assessmentResults = null;

    var getAssessmentResults = function(){
        $http.get("/api/session/" + $routeParams.sessionId + "/assessmentResult").success(function(res) {
            var assessmentResults = {};
            angular.forEach($scope.questions, function(q){
                assessmentResults[q._id] = {
                    responses: {},
                    _questionText: q.text,
                    count: 0
                };
            });  
            angular.forEach(res.results, function(item){
                if (item.assessmentId == $routeParams.assessmentId){
                    var answer = item.result;
                    var question = assessmentResults[item.questionId];
                    question.count++;
                    if (question.responses[answer.text]) {
                        question.responses[answer.text].responses++;
                    } else {
                        question.responses[answer.text] = {
                            text: answer.text,
                            responses: 1
                        };
                    }

                    question.responses[answer.text].percent = function(count) {
                        return parseInt(100 * this.responses / count);
                    };
                }
            });
            $scope.assessmentResults = assessmentResults;
        });
    };

    $scope.endAssessment = function(){
        $http.post("/api/assessmentInstance/" + $routeParams.assessmentId + "/end").success(function(){
            $location.path("/teacher/session/" + $routeParams.sessionId);
        });
    };
    $http.get('/api/assessmentInstance/' + $routeParams.assessmentId).success(function(res) {
        $scope.asseessment = res.results;
        $http.get('/api/assessment/' + $scope.asseessment.assessmentId + "/questions").success(function(res) {
            $scope.questions = res.results;
            getAssessmentResults();
        });
    });

    $io.on("assessmentresultcreated", getAssessmentResults);
}]);