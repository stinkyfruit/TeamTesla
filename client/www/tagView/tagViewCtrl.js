angular.module('which.controllers.tagView', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('TagViewCtrl', function($scope, $state, WhichFactory) {

  $scope.data = {
    tagSearch: '',
    tags: []
  };

  $scope.getWhichesByTag = function() {
    WhichFactory.getWhichesByTag($scope.data.tagSearch).then(function(whiches) {
      $scope.data.whiches = whiches;
    });
  };

  $scope.getWhichesByVoteCount = function(){
    WhichFactory.getWhichesByVoteCount().then(function(whiches){
      console.log(whiches);
      $scope.data.orderedWhiches = whiches;
    });
  };

  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      console.log(which);
      $state.go('app.which', {
        id: which.id,
        question: which.question,
        thingA: which.thingA,
        thingB: which.thingB
      });
    })
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.tagView')
      $scope.data = $scope.originalData;
  });
})
