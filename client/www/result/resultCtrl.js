/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.result', ['which.factory', 'ionic.contrib.ui.tinderCards'])


  .controller('ResultCtrl', function($scope, $state, $stateParams, WhichFactory) {

    $scope.a = $stateParams.a;
    $scope.b = $stateParams.b;
    $scope.choice = $stateParams.choice;

    //Function displays new which, calling the getNew factory function, and navigating to which page along with the newest which.
    $scope.getNewWhich = function() {
      WhichFactory.getNewWhich();
    };

    $scope.originalData = angular.copy($scope.data);

    $scope.$on('clear', function(event, state) {
        $scope.data = $scope.originalData;
    });
  });
