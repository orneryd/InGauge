angular.module('inGuage').controller('TeacherLoginCtrl', ["$scope", "$window", "$http", "$location", function ($scope, $window, $http, $location){
    $scope.user = {};
    $scope.login = function () {
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
}]);
