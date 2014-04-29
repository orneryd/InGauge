'use strict';

angular.module('inGuage').controller('NavbarCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.menu = [{
        'title': 'Student',
        'link': '/'
    },{
        'title': 'Teacher',
        'link': '/dashboard'
    },{
        'title': 'Reports',
        'link': '/reports'
    }];

    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
