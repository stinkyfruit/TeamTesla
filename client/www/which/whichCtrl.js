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
    which: {
      id: $stateParams.id,
      question: $stateParams.question,
      thingA: $stateParams.thingA,
      thingB: $stateParams.thingB,
      imageURI: $stateParams.imageURI,
      report: $stateParams.report
    },
  };


  //This gets called when the user swipes, making a decision with the choice from the user
  $scope.decide = function(result) {
    WhichFactory.choose(result, $scope.data.which.id, $scope.data.username).then(function(votingResult) {

      //Allows for state change, showing new view, second argument is the params being sent in to display results
      $state.go('app.result', {
        a: votingResult.votesForA,
        b: votingResult.votesForB,
        choice: result
      });
    });
  }

  $scope.doSomething = function(){
    console.log('INSIDE WHICH CTRL');
    console.log($scope.data.which.report);

    //set curret report number
    currentReport = $scope.data.which.report;
    console.log(currentReport);
  }

  //reportWhich is called when user presses report button, and will increment the report status
  $scope.reportWhich = function(){
    console.log('INSIDE WHICH CTRL');
    console.log($scope.data.which);
    //pass in the which, the id of which
    WhichFactory.reporting($scope.data.which).then(function(){
      console.log('SENT');
    });
  }



  $scope.$on('discard', function(event, element, card) {
    $scope.decide(card);
  });
  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
      $scope.data = $scope.originalData;
  });
});



