'use strict';

angular.module('glassterSpaApp').controller('NavbarCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
    },{
        'title': 'Dashboard',
        'link': '/dashboard'
    },{
        'title': 'Students',
        'link': '/students'
    }];

    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
