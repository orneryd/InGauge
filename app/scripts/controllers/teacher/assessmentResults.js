angular.module('inGuage').controller('TeacherAssessmentResultsCtrl', ["$scope", "$http", "$io", "$routeParams", "$location", function ($scope, $http, $io, $routeParams, $location) {
    $scope.assessmentResults = null;

    var getAssessmentResults = function(){
        $http.get("/api/session/" + $routeParams.sessionId + "/assessmentResult").success(function(res) {
             var assessmentResults = {};
             var count = 0;
  
             angular.forEach(res.results, function(item, key){
                if (item.assessmentId == $routeParams.assessmentId ){
                    count++;
                    var answer = res.results[key].result;
                    if (assessmentResults[answer.text]) {
                        assessmentResults[answer.text].responses++;
                    } else {
                        assessmentResults[answer.text] = { responses: 1 };
                    }

                    assessmentResults[answer.text].percent = function() {
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

    $io.on("assessmentresultcreated", getAssessmentResults);
    getAssessmentResults();
}]);