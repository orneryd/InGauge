angular.module('inGuage').controller('StudentSessionCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", "$location", "$window", function ($scope, $http, $io, $timeout, $routeParams, $location, $window) {
    
    var webToken = jwt.WebTokenParser.parse($window.localStorage.token);
    var payload = JSON.parse(jwt.base64urldecode(webToken.payloadSegment));
    $scope.student = payload.student;

    $scope.session = null;
    $scope.currentState = 0;
    var getSession = function(){
        $http.get('/api/session/' + $routeParams.id).success(function(session) {
            $scope.session = session;
        });
    };
    
    var startWaiting = function(){
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/session/' + $routeParams.id, { student: $scope.student, state: 0 });
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
        $http.post('/api/session/' + $routeParams.id, { student: $scope.student, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };

    $io.on("sessionStarted", getSession);

    $io.on("sessionClosed", function(){
        $scope.session = null;
    });

    $io.on('assessmentStarted', function(id){
        $location.path("/student/session/" + $routeParams.id + "/assessment/" + id);
    });
    $io.on('feedbackCreated', function(id){
        //TODO: route to feedback
    });

    getSession();
}]);
