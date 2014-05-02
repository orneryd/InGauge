angular.module('inGuage').controller('NavbarCtrl', ["$scope", "$location", "$window", function ($scope, $location, $window){
    
    $scope.userName = function(){
        var webToken = jwt.WebTokenParser.parse($window.localStorage.token);
        var payload = JSON.parse(jwt.base64urldecode(webToken.payloadSegment));
        return payload.firstName + " " + payload.lastName;
    };
    
    $scope.menu = [{
        'title': 'Reports',
        'link': '/teacher/reports'
    },{
        'title': 'Logout',
        'link': '/logout'
    }];
    
    $scope.isActive = function(route){
        return route === $location.path();
    };
}]);
