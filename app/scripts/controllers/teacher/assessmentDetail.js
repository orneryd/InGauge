angular.module('inGuage').controller('TeacherAssessmentDetailCtrl', ["$scope", "$http", "$location", "$routeParams", function ($scope, $http, $location, $routeParams) {
    $scope.assessment = null;
    
    $scope.delete = function(assessment) {
        $http.delete("/api/assessment/" + assessment._id).success(function(){
            $location.path("/teacher/assessments")
        });
    };
    $http.get("/api/assessment/" + $routeParams.id).success(function(assessment){
        $scope.assessment = assessment;
    });
}]);