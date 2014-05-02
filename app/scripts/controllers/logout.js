angular.module('inGuage').controller('LogoutCtrl', ["$scope", "$window", "$location", function ($scope, $window, $location){
    delete $window.localStorage.token;
    $location.path("/login");
}]);
