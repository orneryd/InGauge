angular.module('inGuage').controller('LoginHeaderCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.isActive = function(route){
        return $location.path().indexOf(route) !== -1;
    };
}]);
