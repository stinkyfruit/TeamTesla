/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.result', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('ResultCtrl', function($scope, $state, $stateParams, WhichFactory) {

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;
    $scope.choice = $stateParams.choice;

    //Function displays new which, calling the getNew factory function, and navigating to which page along with the newest which.
    $scope.getNewWhich = function() {
      WhichFactory.getNew().then(function(which) {
        var randomWhich = $scope.getRandomWhich(which);
        randomWhich.imageURI = WhichFactory.defaultImage(randomWhich.imageURI);
        $state.go('app.which', {
          id: randomWhich.id,
          question: randomWhich.question,
          thingA: randomWhich.thingA,
          thingB: randomWhich.thingB,
          imageURI: randomWhich.imageURI
          //tags: which.tags
        });
      });
    };

    //generating random array value
    $scope.getRandomWhich = function(array){
      return array[Math.floor(Math.random()*array.length)];
    };
  });
