/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.which', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('WhichCtrl', function($scope, $state, $stateParams, WhichFactory) {
    $scope.username = 'Me';

    //Defaults the slider to the second "Image" Where are currently hosting the question
    $scope.activeSlide = 1;

    //Probably only initially need id, question, thingA, thingB,
    //Demo object used during development
    $scope.which = {
      id: $stateParams.id,
      question: $stateParams.question,
      thingA: $stateParams.thingA,
      thingB: $stateParams.thingB
      //tags: which.tags
    }

    console.log($scope.which);

    //Slider takes in an array, thus using the sandwich structure to display text between two images
    $scope.things = [$scope.which.thingA, $scope.which.question, $scope.which.thingB];


    $scope.cardSrc = '';
    $scope.cardPartialSwipe = function(amt) {
      var threshold = .15;
      if (amt < 0 - threshold) {
        $scope.cardSrc = $scope.which.thingA;
      } else if (amt > threshold) {
        $scope.cardSrc = $scope.which.thingB;
      } else {
        $scope.cardSrc = '';
      }
    };

    //This gets called when the user swipes, making a decision with the choice from the user
    $scope.decide = function(choice) {
      WhichFactory.choose(choice, $scope.which.id, $scope.username).then(function(votingResult) {
        console.log(votingResult)

        //Allows for state change, showing new view, second argument is the params being sent in to display results
        $state.go('app.result', {
          a: votingResult.votesForA,
          b: votingResult.votesForB
        });
      });

    }
  })
