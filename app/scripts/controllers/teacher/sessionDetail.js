angular.module('inGuage').controller('TeacherSessionDetailCtrl', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    
    var getSession = function(){
        $http.get("/api/session/" + $routeParams.id).success(function(session){
            $scope.session = session;
        });
    };
    $scope.assessmentInSession = function(assessment){
        if ($scope.session){
            for (var i = 0; i< $scope.session.assessments.length; i++){
                if ($scope.session.assessments[i]._id == assessment._id){
                    return true;
                }
            }
        }
    };
    
    $scope.add = function(assessment){
        debugger;
        $http.post("/api/session/" + $scope.session._id + "/assessment", assessment).success(getSession);
    };
    
    $scope.remove = function(assessment){
        debugger;
        $http.delete("/api/session/" + $scope.session._id + "/assessment/" + assessment._id).success(getSession);
    };

    $http.get("/api/assessment").success(function(assessments){
        $scope.assessments = assessments;
    });
    getSession();
}]);