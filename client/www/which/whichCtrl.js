/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.which', ['which.factory', 'ionic.swoosh.cards'])

// .directive('noScroll', function($document) {

//   return {
//     restrict: 'A',
//     link: function($scope, $element, $attr) {
//       $document.on('touchmove', function(e) {
//         e.preventDefault();
//       });
//     }
//   }
// })

.controller('WhichCtrl', function($scope, $timeout, $state, $stateParams, WhichFactory) {
  $scope.data = {
    username: window.localStorage.getItem('which.userToken'),
    activeSlide: 1,
    which: [{
      id: $stateParams.id,
      question: $stateParams.question,
      thingA: $stateParams.thingA,
      thingB: $stateParams.thingB,
      imageURI: $stateParams.imageURI
    }],
  
  };


  //This gets called when the user swipes, making a decision with the choice from the user
  $scope.decide = function(result) {
    WhichFactory.choose(result, $scope.data.which[0].id, $scope.data.username).then(function(votingResult) {

      //Allows for state change, showing new view, second argument is the params being sent in to display results
      $state.go('app.result', {
        a: votingResult.votesForA,
        b: votingResult.votesForB,
        choice: result
      });
    });

  };

  $scope.$on('discard', function(event, element, card) {
    $scope.decide(card);
    $scope.data = {
      
    };
  });
  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
      $scope.data = $scope.originalData;
  });
});



