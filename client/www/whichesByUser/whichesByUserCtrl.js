angular.module('which.controllers.whichesByUser', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('WhichesByUserCtrl', function($scope, $state, WhichFactory) {
  $scope.data = {
    whiches: []
  }
  $scope.$on('$ionicView.afterEnter', function() {
    console.log("entered")
    WhichFactory.getWhichesByUser().then(function (whiches) {
      $scope.data.whiches = whiches;
    
    });
  });

  
  $scope.delete = function(id) {
    console.log("delete item with the id of--", id);
    WhichFactory.deleteWhichById(id).then(function (res) {
        WhichFactory.getWhichesByUser().then(function (whiches) {
          $scope.data.whiches = whiches;
        })
      }, function (err) {
        console.log(err);
      })
  }

  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      which.imageURI = WhichFactory.defaultImage(which.imageURI);
      $state.go('app.whichInfo', {which: which});
    })
  }


});
