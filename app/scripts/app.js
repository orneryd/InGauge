'use strict';

angular.module('sweduphxApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.select2',
    'ui.bootstrap',
    'btford.socket-io'
])
.config(function ($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/students',
            controller: 'StudentsCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}).
factory('$socket', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:9001', { resource:'socket.io' })
    });
}]);