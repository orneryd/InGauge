'use strict';

angular.module('glassterSpaApp', [
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
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/students', {
            templateUrl: 'partials/students',
            controller: 'StudentsCtrl'
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