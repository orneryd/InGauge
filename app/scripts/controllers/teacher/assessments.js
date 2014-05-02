angular.module('inGuage').controller('TeacherAssessmentsCtrl', ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.assessments = null;
    $scope.newAssessmentName = null;
    var getAssessments = function(){
        $http.get("/api/assessment").success(function(assessments){
            $scope.assessments = assessments;
        });
    };
    
    $scope.manage = function(assessment) {
        $location.path("/teacher/assessment/" + assessment._id);
    };
    
    $scope.delete = function(assessment) {
        $http.delete("/api/assessment/" + assessment._id).success(getAssessments);
    };
    
    $scope.createAssessment = function(){
        if ($scope.newAssessmentName){
            $http.post('/api/assessment', { title: $scope.newAssessmentName }).success(getAssessments);
        }
    };

    getAssessments();
}]);