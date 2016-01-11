angular.module('which.controllers.login', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('LoginCtrl', function($scope, $ionicHistory, $state, User) {

  $scope.data = {
    username: '',
    password: ''
  };

  $scope.login = function() {
    User.login($scope.data)
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.login')
      $scope.data = $scope.originalData;
  });
});
