angular.module('inGuage').controller('StudentSessionCtrl', ["$scope", "$http", "$io", "$timeout", "$routeParams", function ($scope, $http, $io, $timeout, $routeParams) {
    $scope.student = null;

    $scope.session = null;
    $scope.currentState = 0;

    var init = function(){
        $io.on("sessionStarted", function(id){
            $http.get('/api/session/' + id).success(function(session) {
                $scope.mode = 1;
                $scope.session = session;
            });
        });

        $io.on("sessionClosed", function(){
            $scope.mode = 0;
            $scope.session = null;
        });

        $io.on('assessmentCreated', function(id){
            //TODO: route to assessment
        });
        $io.on('feedbackCreated', function(id){
            //TODO: route to feedback
        });
        
        $http.get('/api/session/' + $routeParams.id).success(function(session){
            $scope.session = session;
        });
    };

    var startWaiting = function(){
        resetState = $timeout(function(){
            $scope.currentState = 0;
            $http.post('/api/session/' + $scope.session._id, { student: $scope.student, state: 0 });
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
        $http.post('/api/session/' + $scope.session._id, { student: $scope.student, state: state }).success(function(){
            $scope.currentState = state;
            startWaiting();
        });
    };
 
    init();
}]);
