angular.module('inGuage').controller('StudentLoginCtrl', ["$scope", "$window", "$http", "$location", function ($scope, $window, $http, $location){
    $scope.user = {
        student: null,
        code: null
    };
    $scope.login = function () {
        $http.post('/join', $scope.user)
            .success(function (data, status, headers, config) {
                $window.localStorage.token = data.token;
                $location.path("/student/session/" + data.sessionId);
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
