angular.module('inGuage').controller('TeacherSessionCtrl', ["$scope", "$http", "$io", "$timeout", "$location", "$routeParams", function ($scope, $http, $io, $timeout, $location, $routeParams) {
    $scope.session;

    $scope.states = {
        0: 0,
        1: 0,
        2: 0
    };
    $scope.studentsConnectedCount = 0;
    
    $scope.$watch('session', function() {
        // Count all distinct action states
        if ($scope.session && $scope.session.results) {
            var states = {};

            $scope.session.results.forEach(function(element) {
                if (!states[element.state]) {
                    states[element.state] = 0;
                }

                states[element.state]++;
            });

            $scope.session.results.states = states;
        }
    });
    
    // Calculate how long ago started
    var timeout = null;
    var updateFromNow = function() {
        // If called via setTimeout, have to use scope.apply so angular knows
        if ($scope.session && $scope.session.start) {
            $scope.session.momentFromNow = moment($scope.session.start).fromNow();
        }

        // Call again later
        $timeout.cancel(timeout);
        timeout = $timeout(updateFromNow, 60000);
    };
    $scope.showAssessments = false;

    $scope.toggleAssessments = function() {
        $scope.showAssessments = !$scope.showAssessments;
    };
    $scope.issueAssessment = function(assessment) {
        $http.post("/api/session/" +  $routeParams.id + "/assessment/" + assessment._id + "/start").success(function(){
            $location.path("/teacher/session/" +  $routeParams.id + "/assessment/" + assessment._id);
        });
    };
    
    $scope.startFeedback = function(){
        $location.path("/teacher/session/" +  $routeParams.id + "/feedback");
    };
    // End the current session
    $scope.endSession = function(){
        $http.put('/api/session/' +  $routeParams.id).success(function(){
            $location.path("/teacher");
        });
    };

    $scope.getPercent = function(val){
        return parseInt(100 * val);
    };
    
    $io.on('sessionResultCreated', function() {
        debugger;
        $http.get("api/session/" +  $routeParams.id + "/results").success(function(results) {
            var states = {
                0: 0,
                1: 0,
                2: 0
            };
            var studentsConnectedCount = 0;

            if (results) {
                for (var key in results) {
                    var result = results[key];
                    if (typeof states[result.state] === 'number') {
                        states[result.state]++;
                        studentsConnectedCount++;
                    }
                };

                for (key in states) {
                    states[key] = states[key] / studentsConnectedCount || 0;
                }
            }

            $scope.states = states;
            $scope.studentsConnectedCount = studentsConnectedCount;
        });
    });
    
    $http.get("/api/session/" + $routeParams.id).success(function(session){
        $scope.session = session;
        updateFromNow();
    });
}]);