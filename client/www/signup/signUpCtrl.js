angular.module('which.controllers.signUp', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('signUpCtrl', function($scope, $ionicHistory, $state, User) {

  $scope.data = {
    username: '',
    password: ''
  };

  $scope.signUp = function() {
    User.signUp($scope.data);
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.signUp')
      $scope.data = $scope.originalData;
  });
});
