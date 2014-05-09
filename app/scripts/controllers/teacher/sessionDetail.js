angular.module('inGuage').controller('TeacherSessionDetailCtrl', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    var assessmentsById = {};
    
    var arrayToObj = function(array, key){
        var ret = {};
        angular.forEach(array, function(item){
            if (!ret[item[key]]) {
                ret[item[key]] = item;
            }
        });
        return ret;
    };
    var getSession = function(){
        $http.get("/api/session/" + $routeParams.sessionId).success(function(res){
            $scope.session = res.results;
        });
        $http.get("/api/session/"+ $routeParams.sessionId + "/assessmentInstance").success(function(res){
            $scope.assessmentInstances = res.results;
            assessmentsById = arrayToObj(res.results, "assessmentId");
        });
    };
    $scope.inSession = function(assessment){
        return assessmentsById[assessment._id];
    };
    
    $scope.add = function(assessment){
        $http.post("/api/session/" + $scope.session._id + "/assessmentInstance", {
            assessmentId: assessment._id,
            title: assessment.title,
            sessionId: assessment.sessionId,
            accountId: assessment.accountId,
            userId: assessment.userId
        }).success(getSession);
    };
    
    $scope.remove = function(assessment){
        $http.delete("/api/assessmentInstance/" + assessment._id).success(getSession);
    };

    $http.get("/api/assessment").success(function(res){
        $scope.assessments = res.results;
    });
    getSession();
}]);