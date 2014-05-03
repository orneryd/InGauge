angular.module('inGuage').controller('TeacherAssessmentResultsCtrl', ["$scope", "$http", "$io", "$routeParams", "$location", function ($scope, $http, $io, $routeParams, $location) {
    $scope.assessment = null;
    $scope.session = null;
    $scope.assessmentResults = null;
    var getSession = function(){
        $http.get("/api/session/" + $routeParams.id).success(function(session){
            $scope.session = session;
            getAssessment();
        });
    };
    var getAssessment = function(){
        if ($scope.session && $scope.session.assessments){
            for (var i = 0; i< $scope.session.assessments.length; i++){
                if ($scope.session.assessments[i]._id == $routeParams.assessmentId){
                    $scope.assessment = $scope.session.assessments[i];
                }
            }
            getAssessmentResults();
        }
    };
    
    var getAssessmentResults = function(){
        $http.get("/api/session/" + $scope.session._id + "/assessment/" + $scope.assessment._id + "/results").success(function(results) {
            //TODO: Do something interesting with the data.
/*            var assessmentResults = {};
            var count = 0;
            for (var key in results) {
                count++;
                var answer = results[key].givenAnswer;
                if (assessmentResults[answer.text]) {
                    assessmentResults[answer.text].responses++;
                } else {
                    assessmentResults[answer.text] = {responses: 1};
                }

                assessmentResults[answer.text].percent = function() {
                    return parseInt(100 * this.responses / count);
                };
            }*/

            $scope.assessmentResults = results;
        });
    };

    $scope.endAssessment = function(){
        $http.put("/api/session/" + $routeParams.id + "/assessment/" + $scope.assessment._id).success(function(){
            $location.path("/teacher/session/" + $routeParams.id);
        });
    };
    $io.on("assessmentResultCreated", getAssessmentResults);
    getSession();
}]);