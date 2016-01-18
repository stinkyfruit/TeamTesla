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

        if(which.length === 0){
          console.log('no more whiches');
          $state.go('app.tagView');
        } else {        
          var randomWhich = $scope.getRandomWhich(which);
          randomWhich.imageURI = WhichFactory.defaultImage(randomWhich.imageURI);
          $state.go('app.which', {
            id: randomWhich.id,
            question: randomWhich.question,
            thingA: randomWhich.thingA,
            thingB: randomWhich.thingB,
            imageURI: randomWhich.imageURI,
            report: randomWhich.report
            //tags: which.tags
          });
        }
      });
    };

    //generating random array value
    $scope.getRandomWhich = function(array){
      return array[Math.floor(Math.random()*array.length)];
    };

    $scope.originalData = angular.copy($scope.data);

    $scope.$on('clear', function(event, state) {
        $scope.data = $scope.originalData;
    });
  });
