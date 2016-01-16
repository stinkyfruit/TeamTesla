angular.module('which.controllers.afterCreate', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('AfterCreateCtrl', function($scope, $state, WhichFactory) {

    //Load newest function after submission of previous which
    $scope.getNewWhich = function() {
      WhichFactory.getNew().then(function(which) {
        $state.go('app.which', {
          id: $scope.getRandomWhich(which).id,
          question: $scope.getRandomWhich(which).question,
          thingA: $scope.getRandomWhich(which).thingA,
          thingB: $scope.getRandomWhich(which).thingB,
          imageURI: $scope.getRandomWhich(which).imageURI
          //tags: which.tags
        });
      });
    };

    //Navigate to creation page via state change
    $scope.create = function() {
      $state.go('app.create');
    };

    //generating random array value for getNewWhich 
    $scope.getRandomWhich = function(array){
      return array[Math.floor(Math.random()*array.length)];
    };

  });
