angular.module('inGuage').controller('TeacherIndexCtrl', ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.sessions = null;
    $scope.newSessionTitle = null;
    var getSessions = function(){
        $http.get("/api/session").success(function(res){
            $scope.sessions = res.results;
        });
    };

    $scope.start = function(session) {
        $http.post("/api/session/" + session._id + "/start").success(function(){
            $location.path("/teacher/session/" + session._id);
        });
    };
    
    $scope.resume = function(session) {
        $location.path("/teacher/session/" + session._id);
    };
    
    $scope.manage = function(session) {
        $location.path("/teacher/session/" + session._id + "/manage");
    };
    
    $scope.delete = function(session) {
        $http.delete("/api/session/" + session._id).success(getSessions);
    };
    
    $scope.createSession = function(){
        if ($scope.newSessionTitle){
            $http.post('/api/session', { title: $scope.newSessionTitle }).success(getSessions);
        }
    };
    
    getSessions();
}]);