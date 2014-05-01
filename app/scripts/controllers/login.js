angular.module('inGuage').controller('LoginCtrl', ["$scope", "$window", "$http", "$location", function ($scope, $window, $http, $location){
    $scope.mode = 0;
    $scope.switchMode = function(mode){
        $scope.mode = mode;
    };
    
    $scope.student = {};
    $scope.user = {};
    $scope.submit = function () {
        $http.post('/auth', $scope.user)
            .success(function (data, status, headers, config) {
                $window.localStorage.token = data.token;
                $location.path("/teacher");
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.localStorage.token;
                // Handle login errors here
                $scope.errorMessage = 'Error: Invalid user or password';
            });
    };
    $scope.joinSession = function () {
        $http.post('/joinSession', $scope.user)
            .success(function (data, status, headers, config) {
                $window.localStorage.token = data.token;
                $location.path("/student");
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.localStorage.token;
                // Handle login errors here
                $scope.errorMessage = 'Error: Invalid session code';
            });
    };
    //TODO: check to see if you are already logged in and what you are logged in as (student/teacher)
}]);
