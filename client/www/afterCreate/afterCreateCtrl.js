angular.module('which.controllers.afterCreate', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('AfterCreateCtrl', function($scope, $state, WhichFactory) {

    //Load newest function after submission of previous which
    $scope.getNewWhich = function() {
      WhichFactory.getNew().then(function(which) {

        $state.go('app.which', {
          id: which.id,
          question: which.question,
          thingA: which.thingA,
          thingB: which.thingB
          //tags: which.tags
        });
      });
    };

    //Navigate to creation page via state change
    $scope.create = function() {
      $state.go('app.create');
    }

  })
