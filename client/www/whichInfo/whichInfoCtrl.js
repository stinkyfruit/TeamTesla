/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.whichInfoCtrl', ['which.factory', 'ionic.swoosh.cards'])


.controller('WhichInfoCtrl', function($scope, $state, $stateParams, WhichFactory) {
  $stateParams.which.imageURI = 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_m.jpg';
  $scope.data = {
    username: window.localStorage.getItem('which.userToken'),
    activeSlide: 1,
    which: [$stateParams.which],
    cardSrc: '',
    // imageURI: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_m.jpg',
    // imageURI: "data:image/jpeg;base64," + $stateParams.which.imageURI,
  };
 

  $scope.back = function() {
    $state.go('app.whichesByUser');
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.whichesByUser')
      $scope.data = angular.copy($scope.originalData);
  });
});
