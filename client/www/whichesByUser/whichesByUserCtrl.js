angular.module('which.controllers.whichesByUser', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('WhichesByUserCtrl', function($scope, $state, WhichFactory) {
  $scope.data = {
    whiches: []
  }
  $scope.$on('$ionicView.afterEnter', function() {

    WhichFactory.getWhichesByUser().then(function (whiches) {
      $scope.data.whiches = whiches;
    
    });
  });


  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      which.imageURI = WhichFactory.defaultImage(which.imageURI);
      $state.go('app.whichInfo', {which: which});
    })
  }


});
