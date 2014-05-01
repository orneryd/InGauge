angular.module('inGuage', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'btford.socket-io'
])
.factory('$io', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('/', { resource:'socket.io' })
    });
}])
.factory('$authInterceptor', ["$q", "$window", "$location", function ($q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
            }
            return config;
        },
        responseError: function (response) {
            debugger;
            if (response.status === 401) {
                delete $window.localStorage.token;
                $location.path("/login");
            }
            return response || $q.when(response);
        }
    };
}])
.config(["$routeProvider", "$locationProvider", "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
        .when('/student', {
            templateUrl: 'partials/student/index',
            controller: 'StudentIndexCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
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
            redirectTo: '/login'
        });
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('$authInterceptor');
}]);
