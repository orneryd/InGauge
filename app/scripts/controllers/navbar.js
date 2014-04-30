angular.module('inGuage').controller('NavbarCtrl', ["$scope", "$location", function ($scope, $location){
    $scope.menu = [{
        'title': 'Student',
        'link': '/student'
    },{
        'title': 'Teacher',
        'link': '/teacher'
    },{
        'title': 'Reports',
        'link': '/reports'
    }];

    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
