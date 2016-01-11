/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.result', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('ResultCtrl', function($scope, $state, $stateParams, WhichFactory) {

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;

    //Function displays new which, calling the getNew factory function, and navigating to which page along with the newest which.
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
  });
