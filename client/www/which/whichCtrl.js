/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.which', ['which.factory', 'ionic.swoosh.cards'])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('WhichCtrl', function($scope, $timeout, $state, $stateParams, WhichFactory) {
  $scope.data = {
    username: window.localStorage.getItem('which.userToken'),
    activeSlide: 1,
    which: [{
      id: $stateParams.id,
      question: $stateParams.question,
      thingA: $stateParams.thingA,
      thingB: $stateParams.thingB,
      imageURI: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_m.jpg',
      // imageURI: "data:image/jpeg;base64," + $stateParams.imageURI
    }],
  
  };


  //This gets called when the user swipes, making a decision with the choice from the user
  $scope.decide = function(result) {
    var letter = result[result.length -1].toLowerCase();
    var choice = $scope.data.which[0][result];
    WhichFactory.choose(choice, $scope.data.which[0].id, $scope.data.username).then(function(votingResult) {
      console.log(votingResult)

      //Allows for state change, showing new view, second argument is the params being sent in to display results
      $state.go('app.result', {
        a: votingResult.votesForA,
        b: votingResult.votesForB,
        choice: letter
      });
    });

  }

  $scope.$on('discard', function(event, element, card) {
    $scope.decide(card);
  });
})



