angular.module('inGuage').controller('StudentSessionCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", "$location", "$window", '$identity', 
function ($scope, $http, $io, $timeout, $routeParams, $location, $window, $identity) {
    
    $scope.student = $identity.getFullName();

    $scope.session = null;
    $scope.currentState = 0;
    var getSession = function(){
        $http.get('/api/session/' + $routeParams.sessionId).success(function(res) {
            $scope.session = res.results;
            $io.emit('subscribe', $scope.session._id);
        });
    };
    
    var startWaiting = function(){
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/session/' + $routeParams.sessionId + "/sessionResult", { student: $scope.student, state: 0 });
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
        $http.post('/api/session/' + $routeParams.sessionId + "/sessionResult", { student: $scope.student, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };

    $io.on("session:started", getSession);

    $io.on("session:closed", function(){
        $scope.session = null;
    });

    $io.on('assessmentinstance:started', function(id){
        $location.path("/student/session/" + $routeParams.sessionId + "/assessment/" + id);
    });
    $io.on('feedback:started', function(id){
        //TODO: route to feedback
    });

    getSession();
}]);
