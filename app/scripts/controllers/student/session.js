angular.module('inGuage').controller('StudentSessionCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", "$location", "$window", '$identity', 
function ($scope, $http, $io, $timeout, $routeParams, $location, $window, $identity) {
    
    $scope.student = $identity.getFullName();

    $scope.session = null;
    $scope.currentState = 0;
    var getSession = function(){
        $http.get('/api/session/' + $routeParams.id).success(function(res) {
            $scope.session = res.results;
        });
    };
    
    var startWaiting = function(){
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/session/' + $routeParams.id + "/sessionResult", { student: $scope.student, state: 0 });
        }, 7000);
        resetButtons = $timeout(function(){
            $scope.disableClick = false;
        }, 3000);
    };
    
    var resetState, resetButtons;
    $scope.sendAction = function(state){
        $scope.disableClick = true;
        if (resetState){
            $timeout.cancel(resetState);
            $timeout.cancel(resetButtons);
            resetState = null;
            resetButtons = null;
        }
        $http.post('/api/session/' + $routeParams.id + "/sessionResult", { student: $scope.student, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };

    $io.on("sessionstarted", getSession);

    $io.on("sessionclosed", function(){
        $scope.session = null;
    });

    $io.on('assessmentinstancestarted', function(id){
        $location.path("/student/session/" + $routeParams.id + "/assessment/" + id);
    });
    $io.on('feedbackstarted', function(id){
        //TODO: route to feedback
    });

    getSession();
}]);
