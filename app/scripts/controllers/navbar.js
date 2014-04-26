'use strict';

angular.module('sweduphxApp').controller('NavbarCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
    },{
        'title': 'Dashboard',
        'link': '/dashboard'
    }];

    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
