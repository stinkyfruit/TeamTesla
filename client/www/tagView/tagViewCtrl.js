angular.module('which.controllers.tagView', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('TagViewCtrl', function($scope, $state, WhichFactory) {

  $scope.data = {
    tagSearch: '',
    tags: []

  };

  $scope.getWhichesByTag = function() {
    if ($scope.data.tagSearch !== '') {
      WhichFactory.getWhichesByTag($scope.data.tagSearch).then(function(whiches) {
        $scope.data.whiches = whiches;

      });
    }
  };

  $scope.getMostPopularWhiches = function(){
    WhichFactory.getMostPopularWhiches().then(function(popWhiches) {
      $scope.data.popWhiches = popWhiches;
    });
  };

  $scope.goToWhich = function(id) {
    console.log(id);
    WhichFactory.getWhichByID(id).then(function(which) {
      $scope.data.whiches = [];
      $scope.data.popWhiches = [];
      var image = WhichFactory.defaultImage(which.imageURI);

      $state.go('app.which', {
        id: which.id,
        question: which.question,
        thingA: which.thingA,
        thingB: which.thingB,
        imageURI: image,
        report: which.report //REPORT added
      });
    })
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.tagView')
      $scope.data = $scope.originalData;
  });
})
