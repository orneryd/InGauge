'use strict';

angular.module('sweduphxApp').controller('NavbarCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.menu = [{
        'title': 'Student',
        'link': '/'
    },{
        'title': 'Teacher',
        'link': '/dashboard'
    }];

    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
