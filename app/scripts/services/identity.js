/**
 * Created by tsweet on 5/8/14.
 */
angular.module('inGuage').factory('$identity', ['$window', function($window){
    var getToken = function(){
        return jwt.WebTokenParser.parse($window.localStorage.token);
    };
    var getPayload = function(){
        return JSON.parse(jwt.base64urldecode(getToken().payloadSegment));
    };

    var getFullName = function(){
        var info = getPayload();
        if (info && info.type !== 0){
            return info.firstName + " " + info.lastName;
        } else {
            return info.student;
        }
    };
    return {
        getToken: getToken,
        getPayload: getPayload,
        getFullName: getFullName
    }
}]);