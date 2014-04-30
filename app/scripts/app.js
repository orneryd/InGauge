angular.module('inGuage', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'btford.socket-io'
])
.config(function ($routeProvider, $locationProvider){
    $routeProvider
        .when('/student', {
            templateUrl: 'partials/student/index',
            controller: 'StudentIndexCtrl'
        })
        .when('/teacher', {
            templateUrl: 'partials/teacher/index',
            controller: 'TeacherIndexCtrl'
        })
        .when('/reports', {
            templateUrl: 'partials/reports/index',
            controller: 'ReportsIndexCtrl'
        })
        .otherwise({
            redirectTo: '/student'
        });
    $locationProvider.html5Mode(true);
}).
factory('$io', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('/', { resource:'socket.io' })
    });
}]);
