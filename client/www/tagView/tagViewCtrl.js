angular.module('which.controllers.tagView', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('TagViewCtrl', function($scope, $state, WhichFactory) {

  $scope.data = {
    tagSearch: '',
    tags: []

  };

  $scope.getWhichesByTag = function() {
    WhichFactory.getWhichesByTag($scope.data.tagSearch).then(function(whiches) {
      $scope.data.whiches = whiches;
    })
  }

  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      $state.go('app.which', which);
    })
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.tagView')
      $scope.data = $scope.originalData;
  });
})
