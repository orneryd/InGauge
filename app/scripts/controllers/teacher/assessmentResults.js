angular.module('inGuage').controller('TeacherAssessmentResultsCtrl', ["$scope", "$http", "$io", "$routeParams", function ($scope, $http, $io, $routeParams) {
    $scope.assessment = null;
    $scope.session = null;
    
    var getSession = function(){
        $http.get("/api/session/" + $routeParams.id).success(function(session){
            $scope.session = session;
            getAssessment()
        });
    };
    var getAssessment = function(){
        if ($scope.session && $scope.session.assessments){
            for (var i = 0; i< $scope.session.assessments.length; i++){
                if ($scope.session.assessments[i]._id == $routeParams.assessmentId){
                    $scope.assessment = $scope.session.assessments[i];
                }
            }
        }
    };
    
    $scope.getBackUrl = function(){
        return "/teacher/session/" + $routeParams.id;
    };
    $io.on("assessmentResultCreated", getSession);
    getSession();
}]);