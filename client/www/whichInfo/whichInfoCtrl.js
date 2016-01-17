/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.whichInfoCtrl', ['which.factory', 'ionic.swoosh.cards'])


.controller('WhichInfoCtrl', function($scope, $state, $stateParams, WhichFactory) {

  $scope.data = {
    username: window.localStorage.getItem('which.userToken'),
    activeSlide: 1,
    which: [$stateParams.which],
    cardSrc: '',
  };
 

  $scope.back = function() {
    $state.go('app.whichesByUser');
  }

  // $scope.originalData = angular.copy($scope.data);

  // $scope.$on('clear', function(event, state) {
  //   if (state === 'app.whichesByUser')
  //     $scope.data = {};
  // });
});
