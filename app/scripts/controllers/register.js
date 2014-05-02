angular.module('inGuage').controller('RegisterCtrl', ["$scope", "$window", "$http", "$location", function ($scope, $window, $http, $location){

    $scope.confirm_password = null;
    $scope.user = {};
    $scope.register = function () {
        if (!$scope.registerForm.$valid){
            //TODO: validate passwords match on registration
            return;
        }
        $http.post('/register', $scope.user)
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
    //TODO: check to see if you are already logged in and what you are logged in as (student/teacher)
}]);
