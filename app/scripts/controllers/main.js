'use strict';

angular.module('sweduphxApp').controller('MainCtrl', ["$scope", "$http", "$socket", function ($scope, $http, $socket) {
/*    $http.get('/api/question').success(function(questions) {
        $scope.questions = questions;
    });
    $socket.on('newQuestion', function(){
        $http.get('/api/question').success(function(questions) {
            $scope.questions = questions;
        });
    });
    $scope.testDropdownOptions = {
        placeholder: "Select a test...",
        allowClear: true,
        minimumInputLength: 1,
        id: function(item)
        {
            return { id: item._id }
        },
        formatResult: function(result)
        {
            return result.name;
        },
        formatSelection: function(result)
        {
            return result.name;
        },
        ajax: { 
            // instead of writing the function to execute the request we use Select2's convenient helper
            url: "/api/test",
            dataType: 'json',
            data: function (term) {
                return {
                    q: term, // search term
                    page_limit: 100
                };
            },
            results: function (data) { // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to alter remote JSON data
                return {
                    results: data
                };
            }
        },
        initSelection: function(element, callback) {
            // the input tag has a value attribute preloaded that points to a preselected movie's id
            // this function resolves that id attribute to an object that select2 can render
            // using its formatResult renderer - that way the movie name is shown preselected

        }
    };
    $scope.newQuestion = {
        test: null,
        multiChoice: false,
        text: null,
        answers: []
    };
    $scope.addAnswer = function(){
      $scope.newQuestion.multiChoice = true;
      $scope.newQuestion.answers.push({
          text: null,
          correct: false
      });
    };
    $scope.postQuestion = function()
    {
        $scope.newQuestion.testName = $scope.newQuestion.test.name;
        $http.post('/api/question', $scope.newQuestion).success(function() {
            $scope.newQuestion = {
                testName: null,
                multiChoice: false,
                text: null,
                answers: []
            };
        });
    };*/
}]);
